import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, Calendar } from "lucide-react";

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

const getStatusStyles = (status) => {
  switch (status) {
    case "completed":
      return { 
        color: "bg-gray-50 border-l-4 border-gray-400", 
        badge: "destructive",
        timeColor: "text-gray-500"
      };
    case "ongoing":
      return { 
        color: "bg-green-50 border-l-4 border-green-500", 
        badge: "success",
        timeColor: "text-green-600"
      };
    case "upcoming":
      return { 
        color: "bg-amber-50 border-l-4 border-amber-400", 
        badge: "warning",
        timeColor: "text-amber-600"
      };
    case "future":
      return { 
        color: "bg-blue-50 border-l-4 border-blue-400", 
        badge: "secondary",
        timeColor: "text-blue-600"
      };
    default:
      return { 
        color: "bg-gray-50 border-l-4 border-gray-300", 
        badge: "secondary",
        timeColor: "text-gray-500"
      };
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const TimeTable = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Math Lecture",
      startTime: "2025-03-20T10:00:00",
      endTime: "2025-03-20T12:00:00",
      location: "Room 302",
    },
    {
      id: 2,
      name: "Physics Lab",
      startTime: "2025-03-20T13:00:00",
      endTime: "2025-03-20T15:00:00",
      location: "Science Wing B",
    },
    {
      id: 3,
      name: "Computer Science Seminar",
      startTime: "2025-04-22T04:00:00",
      endTime: "2025-04-22T09:30:00",
      location: "Auditorium",
    },
    {
      id: 4,
      name: "Chemistry Practical",
      startTime: "2025-04-22T05:15:00",
      endTime: "2025-04-22T19:30:00",
      location: "Lab 105",
    },
    {
      id: 5,
      name: "Sports Training",
      startTime: "2025-04-24T20:00:00",
      endTime: "2025-04-24T21:30:00",
      location: "Sports Complex",
    },
    {
      id: 6,
      name: "Result Declaration",
      startTime: "2025-04-25T10:00:00",
      endTime: "2025-04-25T12:00:00",
      location: "Main Hall",
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
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Schedule</h1>
        <p className="text-gray-600">Upcoming and ongoing academic events</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const status = getStatus(event.startTime, event.endTime);
            const styles = getStatusStyles(status);
            return (
              <Card
                key={event.id}
                className={`rounded-sm shadow-sm hover:shadow-md transition-shadow ${styles.color}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium text-gray-800">
                      {event.name}
                    </CardTitle>
                    <Badge variant={styles.badge} className="capitalize rounded-sm">
                      {status}
                    </Badge>
                  </div>
                  {event.location && (
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {event.location}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className={`flex items-center ${styles.timeColor}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>
                        {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                        {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(event.startTime)}</span>
                    </div>
                  </div>
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