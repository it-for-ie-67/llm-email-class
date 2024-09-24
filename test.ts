const data = {
  contents: [
    {
      role: "user",
      parts: [
        {
          text: "Write an email to the advisor in Thai.  The topic is [ขอพบ วันจันทร์ นี้ ตอน 10 โมง ว่างมั้ย อยากปรึกษาเรื่องโปรเจค].",
        },
      ],
    },
  ],
  systemInstruction: {
    role: "user",
    parts: [
      {
        text: "The writer is a female student. The tone should be formal.",
      },
    ],
  },
  generationConfig: {
    temperature: 1.45,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
};
