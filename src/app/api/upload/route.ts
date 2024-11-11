export const config = {
    api: {
        bodyParser: false,
    },
}

export async function POST(request: Request) {
    console.log(request.headers)

    const contentType = request.headers.get('content-type') || ''
    console.log('Content-Type:', contentType)

    return Response.json(
        contentType, {
        status: 200,
    })
}
