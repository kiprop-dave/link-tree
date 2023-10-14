import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET } from '$env/static/private';

type JWTPayload = {
	id: string;
	email: string;
};

export const createJWT = async (credentials: JWTPayload): Promise<string> => {
	const jwt = await new SignJWT(credentials)
		.setProtectedHeader({ alg: 'HS256' })
		.sign(new TextEncoder().encode(JWT_SECRET));
	return jwt;
};

type VerifyResult = (JWTPayload & { status: 'success' }) | { status: 'failed' };
export const verifyJWT = async (token: string): Promise<VerifyResult> => {
	try {
		const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
		const res = payload as JWTPayload;
		return { status: 'success', ...res };
	} catch (err) {
		return { status: 'failed' };
	}
};
