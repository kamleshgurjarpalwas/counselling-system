import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const getStatus = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now > end) return "completed";
  if (now >= start && now <= end) return "ongoing";
  if (now < start) {
    const diffMinutes = (start - now) / (1000 * 60);
    return diffMinutes <= 30 ? "upcoming" : "future";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-red-200";
    case "ongoing":
      return "bg-green-200 animate-pulse";
    case "upcoming":
      return "bg-yellow-300";
    case "future":
      return "bg-yellow-100";
    default:
      return "bg-gray-100";
  }
};

const TimeTable = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Math Lecture",
      startTime: "2025-03-20T10:00:00",
      endTime: "2025-03-20T12:00:00",
    },
    {
      id: 2,
      name: "Physics Lab",
      startTime: "2025-03-20T13:00:00",
      endTime: "2025-03-20T15:00:00",
    },
    {
      id: 3,
      name: "Computer Science Seminar",
      startTime: "2025-03-20T16:00:00",
      endTime: "2025-03-20T17:30:00",
    },
    {
      id: 4,
      name: "Chemistry Practical",
      startTime: "2025-03-21T07:00:00",
      endTime: "2025-03-21T19:30:00",
    },
    {
      id: 5,
      name: "Sports Training",
      startTime: "2025-03-24T20:00:00",
      endTime: "2025-03-24T21:30:00",
    },
    {
      id: 5,
      name: "Result declearation",
      startTime: "2025-03-24T20:00:00",
      endTime: "2025-03-24T21:30:00",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents([...events]); // Refresh UI every minute
    }, 60000);
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        📅 Event Timetable
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((event) => {
            const status = getStatus(event.startTime, event.endTime);
            return (
              <Card
                key={event.id}
                className={`shadow-sm ${getStatusColor(status)} p-2`}
              >
                <CardHeader className="p-2">
                  <CardTitle className="text-md font-medium">
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    🕒 {new Date(event.startTime).toLocaleTimeString()} -{" "}
                    {new Date(event.endTime).toLocaleTimeString()}
                  </span>
                  <span className="px-2 py-1 rounded text-white bg-gray-700 capitalize text-xs">
                    {status}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeTable;
