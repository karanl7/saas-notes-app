import { useEffect, useState } from "react";
import API from "../api";

export default function Notes({ user }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      await API.post("/notes", { title, content });
      setTitle(""); setContent("");
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.error || "Error creating note");
    }
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const upgrade = async () => {
    try {
      await API.post(`/tenants/${user.tenant}/upgrade`);
      alert("Tenant upgraded to PRO 🚀");
    } catch (err) {
      alert("Upgrade failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Notes ({user.tenant})</h1>
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
      )}

      <form onSubmit={addNote} className="space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded-md"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border rounded-md"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
          Add Note
        </button>
      </form>

      <div className="space-y-2">
        {notes.map((n) => (
          <div key={n.id} className="p-4 border rounded-md flex justify-between">
            <div>
              <h2 className="font-semibold">{n.title}</h2>
              <p>{n.content}</p>
            </div>
            <button
              onClick={() => deleteNote(n.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {error.includes("Note limit") && user.role === "ADMIN" && (
        <button
          onClick={upgrade}
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          Upgrade to PRO
        </button>
      )}
    </div>
  );
}
