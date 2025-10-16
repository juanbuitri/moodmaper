import React, { useState, useEffect } from "react";
import "./App.css";

const emotions = [
  { name: "😊 Feliz", color: "#FFD93D" },
  { name: "😔 Triste", color: "#6C63FF" },
  { name: "😤 Enojado", color: "#FF6B6B" },
  { name: "😴 Cansado", color: "#6B7280" },
  { name: "😎 Tranquilo", color: "#4ADE80" },
];

export default function App() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [moodData, setMoodData] = useState(
    JSON.parse(localStorage.getItem("moodData")) || {}
  );

  // Guardar en localStorage cada vez que cambian los datos
  useEffect(() => {
    localStorage.setItem("moodData", JSON.stringify(moodData));
  }, [moodData]);

  // Registrar emoción del día
  const handleSaveMood = () => {
    if (!selectedEmotion) return;
    setMoodData({ ...moodData, [today]: selectedEmotion });
    setSelectedEmotion(null);
  };

  // Generar calendario del mes actual
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="app">
      <h1 className="title">🌈 MoodMapper</h1>
      <p className="subtitle">Registra cómo te sientes cada día</p>

      <div className="emotion-selector">
        {emotions.map((e) => (
          <button
            key={e.name}
            style={{
              backgroundColor:
                selectedEmotion?.name === e.name ? e.color : "white",
              color: selectedEmotion?.name === e.name ? "white" : "#333",
              border: `2px solid ${e.color}`,
            }}
            onClick={() => setSelectedEmotion(e)}
          >
            {e.name}
          </button>
        ))}
      </div>

      <button className="save-btn" onClick={handleSaveMood}>
        Guardar emoción del día
      </button>

      <h2 className="calendar-title">
        Calendario Emocional — {new Date().toLocaleString("es-ES", { month: "long" })}
      </h2>

      <div className="calendar">
        {daysArray.map((day) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          const emotion = moodData[dateKey];
          return (
            <div
              key={day}
              className="day"
              style={{ backgroundColor: emotion ? emotion.color : "#f0f0f0" }}
              title={emotion ? emotion.name : "Sin registro"}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
