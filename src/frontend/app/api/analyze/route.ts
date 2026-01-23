export async function POST(req: Request) {
  const formData = await req.formData();
  const cvFile = formData.get('cv_file') as File;
  const jobContent = formData.get('job_content') as string;

  if (!cvFile || !jobContent) {
    return Response.json(
      { error: "Both CV file and job content are required" },
      { status: 400 }
    );
  }

  try {
    const backendFormData = new FormData();
    backendFormData.append('cv_file', cvFile);
    backendFormData.append('job_content', jobContent);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${backendUrl}/analyze`, {
      method: "POST",
      body: backendFormData,
    });

    const data = await response.json();

    if (response.ok) {
      return Response.json({ analysis: data.message });
    } else {
      return Response.json({ error: data.detail || "Backend error" }, { status: response.status });
    }
  } catch (error) {
    return Response.json({ error: "Failed to analyze" }, { status: 500 });
  }
}
