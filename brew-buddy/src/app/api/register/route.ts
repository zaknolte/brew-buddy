import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const { email, password} = body.user;
    if ( !email || !password) {
        return NextResponse.json({ error: 'Please fill out all fields' }, { status: 400 })
    };

    const emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (emailExists) {
        return new NextResponse("User already exists", { status: 400})
    };

    const hashPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            hashPass
        }
    });

    return NextResponse.json(user)
}