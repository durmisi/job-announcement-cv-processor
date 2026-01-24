export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return Response.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${backendUrl}/fetch-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (response.ok) {
      return Response.json(data);
    } else {
      return Response.json({ error: data.detail || "Backend error" }, { status: response.status });
    }
  } catch (error) {
    return Response.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}