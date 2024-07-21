import { type NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getUserBySubscriptionId } from '@/data';
import { db } from '@/lib/db';

export const POST = async (req: NextRequest) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) {
            throw new Error('RAZORPAY_WEBHOOK_SECRET is not defined');
        }

        if (!req.headers) {
            return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
        }

        const shasum = crypto.createHmac('sha256', secret);
        const body = await req.text(); // Get the raw body as text
        shasum.update(body);
        const digest = shasum.digest('hex');

        if (digest !== req.headers.get('x-razorpay-signature')) {
            return NextResponse.json({ message: 'Invalid Signature' }, { status: 401 });
        }

        const parsedBody = JSON.parse(body);
        const { payload } = parsedBody;
        const subscriptionId = payload.subscription.entity.id;
        const current_end = new Date(payload.subscription.entity.current_end * 1000);

        const user = await getUserBySubscriptionId(subscriptionId);

        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                subscriptionCurrendCycleEnd: current_end,
            },
        });

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
