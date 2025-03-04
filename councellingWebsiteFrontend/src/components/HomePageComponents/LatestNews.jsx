import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newsData = [
  { id: 1, title: "Counseling 2025 Schedule Released", date: "Feb 28, 2025" },
  { id: 2, title: "New Institutes Added to the List", date: "Feb 27, 2025" },
  { id: 3, title: "Seat Matrix Updated for 2025", date: "Feb 26, 2025" },
  { id: 4, title: "Important: Last Date for Application", date: "Feb 25, 2025" },
  { id: 5, title: "Cutoff Ranks for 2025 Announced", date: "Feb 24, 2025" },
  { id: 6, title: "Document Verification Process Explained", date: "Feb 23, 2025" },
  { id: 7, title: "Counseling Registration Begins", date: "Feb 22, 2025" },
  { id: 8, title: "Steps to Change Institute Preferences", date: "Feb 21, 2025" },
  { id: 9, title: "Mock Allotment Results Released", date: "Feb 20, 2025" },
  { id: 10, title: "Final Seat Allotment Process Details", date: "Feb 19, 2025" },
  { id: 11, title: "Fee Payment Guidelines for 2025 Admissions", date: "Feb 18, 2025" },
  { id: 12, title: "Important: How to Check Allotment Status", date: "Feb 17, 2025" },
  { id: 13, title: "Withdrawal & Refund Policy Explained", date: "Feb 16, 2025" },
  { id: 14, title: "Reporting Instructions for Allotted Institutes", date: "Feb 15, 2025" },
  { id: 15, title: "Common Mistakes to Avoid in Counseling", date: "Feb 14, 2025" },
  { id: 16, title: "New Scholarship Opportunities Available", date: "Feb 13, 2025" },
  { id: 17, title: "Helpdesk Support Extended for Applicants", date: "Feb 12, 2025" },
  { id: 18, title: "Online Counseling Portal Maintenance Notice", date: "Feb 11, 2025" },
  { id: 19, title: "How to Upload Documents for Verification", date: "Feb 10, 2025" },
  { id: 20, title: "Special Round Counseling Dates Announced", date: "Feb 9, 2025" },
];

const LatestNews = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    if (!isPaused) {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
            scrollContainer.scrollTop = 0; // Reset scroll to top when reaching the end
          } else {
            scrollContainer.scrollTop += 1; // Scroll down gradually
          }
        }
      }, 25); 
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <Card className="w-full max-w-md mx-auto rounded-none">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className="h-100 overflow-hidden hover:overflow-y-auto scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <ul className="space-y-3">
            {newsData.map((news) => (
              <li key={news.id} className="p-2 cursor-pointer rounded border-b hover:bg-gray-200">
                <p className="font-semibold">{news.title}</p>
                <p className="text-sm text-gray-500">{news.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestNews;
