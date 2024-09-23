import { useState, ChangeEvent } from "react";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const storyInit =
  "ขอพบ วันจันทร์ นี้ ตอน 10 โมง ว่างมั้ย อยากปรึกษาเรื่องโปรเจค";
function App() {
  const [story, setStory] = useState(storyInit);
  const [gender, setGender] = useState("male");
  const [tone, setTone] = useState("very formal");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>
  ) {
    console.log(e.target.value);
    if (e.target.name === "story") setStory(e.target.value);
    if (e.target.name === "gender") setGender(e.target.value);
    if (e.target.name === "tone") setTone(e.target.value);
  }

  function handleSubmit() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const textInstruction = `The tone should be ${tone}. The topic is [${story}]. The email composer is a ${gender} student.`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Write an email to the advisor in Thai.",
            },
          ],
        },
      ],
      systemInstruction: {
        role: "user",
        parts: [
          {
            text: textInstruction,
          },
        ],
      },
      generationConfig: {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    };

    console.log(payload.contents[0].parts[0]);

    setLoading(true);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        setResponse(res.candidates[0].content.parts[0].text);
      })
      .finally(() => setLoading(false));
  }

  console.log({ gender, story, tone });
  return (
    <>
      <h1>Write Email to Ajarn</h1>
      <i>Powered by Google Gimini</i>

      <div>
        <textarea
          name="story"
          rows={8}
          cols={50}
          value={story}
          onChange={handleChange}
        />
        <div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="tone">Tone</label>
            <select name="tone" onChange={handleChange}>
              <option value="very formal">Very Formal</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="funny">Funny</option>
            </select>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading" : "Submit"}
        </button>
      </div>
      {response && (
        <div>
          <pre>{response}</pre>
        </div>
      )}
    </>
  );
}

export default App;
