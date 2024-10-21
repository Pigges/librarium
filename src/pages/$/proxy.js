export async function GET({params, request}) {
    return await fetch(new URL(request.url).searchParams.get('src') || 'https://lbry.se/image?url=aHR0cHM6Ly90aHVtYm5haWxzLmxicnkuY29tL1FRdTFfYmYxQmRv&hash=210a3eabab688ae8409ec3b9f617ef1f0653577992fd2a4468aaeb72f248e9e3&w=480');
}