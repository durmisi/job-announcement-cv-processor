export async function POST(req: Request) {
  const { jobDescription, cvContent } = await req.json();

  if (!jobDescription || !cvContent) {
    return Response.json(
      { error: "Both job description and CV content are required" },
      { status: 400 }
    );
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return simulated analysis data
  const mockAnalysis = {
    score: 78,
    summary:
      "The candidate demonstrates strong technical skills and relevant experience that align well with the core requirements. There are some gaps in specific technologies mentioned in the job description, but the overall profile shows good potential for the role.",
    strengths: [
      "Strong programming fundamentals with experience in multiple languages",
      "Demonstrated ability to work in agile environments",
      "Excellent communication skills evidenced by team collaboration experience",
      "Relevant industry experience that aligns with company focus",
    ],
    gaps: [
      "Limited experience with specific cloud platforms mentioned (AWS/GCP)",
      "No direct experience with the required testing frameworks",
      "Could benefit from more leadership or mentoring experience",
    ],
    skills: [
      { name: "JavaScript", status: "strong" as const },
      { name: "React", status: "strong" as const },
      { name: "TypeScript", status: "strong" as const },
      { name: "Node.js", status: "partial" as const },
      { name: "Python", status: "partial" as const },
      { name: "AWS", status: "missing" as const },
      { name: "Docker", status: "partial" as const },
      { name: "GraphQL", status: "missing" as const },
      { name: "SQL", status: "strong" as const },
      { name: "Git", status: "strong" as const },
    ],
    experience: [
      { category: "Technical Skills", match: 82 },
      { category: "Industry Experience", match: 75 },
      { category: "Education", match: 90 },
      { category: "Soft Skills", match: 85 },
      { category: "Leadership", match: 60 },
    ],
    recommendations: [
      "Obtain AWS certification or complete relevant cloud projects to address the infrastructure gap",
      "Highlight any informal leadership or mentoring experiences in more detail",
      "Consider adding a projects section showcasing work with the missing technologies",
      "Tailor the professional summary to better reflect the specific role requirements",
    ],
  };

  return Response.json({ analysis: mockAnalysis });
}
