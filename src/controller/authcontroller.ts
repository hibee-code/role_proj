import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import { User } from '../model/adminUser';

// Generate a secret key for MFA
// const generateMfaSecret = () => {
//     return speakeasy.generateSecret({ length: 20  });
// };
export const generateMfaSecret = () => {
  const secret = speakeasy.generateSecret({ length: 20 });
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url,
  };
};
const generateMfaToken = (secret: string): string => {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
    });
    return token;
  };


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, enableMfa } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Invalid input' });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ msg: `Email already exists in the database: ${email}` });
        }

        const hash_password = bcrypt.hashSync(password, 10);

        // Generate MFA secret key if user wants to enable 2FA
        const mfaSecret = enableMfa ? generateMfaSecret().secret : null;
        const mfaToken = enableMfa ? generateMfaToken(mfaSecret!) : null;

        // Create a new user with MFA secret key and 2FA status
       const newUser =  await User.create({
            username,
            email,
            password: hash_password,
            mfaSecret,
            mfaEnabled: enableMfa,
            mfaToken
        });
        res.status(201).json({
            status: 'success',
            newUser:newUser,
            mfaToken: mfaToken,
            // JSON.stringify(mfaToken),
            message: 'Registered successfully, please login',
        });
        return { newUser }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
        
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, mfaToken } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // Check if 2FA is enabled for the user
        if (user.mfaEnabled) {
            // Verify MFA token if 2FA is enabled
            const mfaVerified = speakeasy.totp.verify({
                secret: user.mfaSecret,
                encoding: 'base32',
                step: 30,
                token: mfaToken,
            });
            console.log('User:', user);
            console.log('Provided MFA Token:', mfaToken);
            console.log('MFA Verification Result:', mfaVerified);

            if (mfaVerified) {
                return res.status(401).json({ msg: 'Invalid MFA token' });
            }
        }


        // Continue with login logic

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};;



