import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {Object} College
 * @property {string} tag - The tag of the college (e.g., "iit", "nit").
 * @property {string} collegeId - The unique ID of the college.
 * @property {string} collegeName - The name of the college.
 * @property {string} collegeState - The state where the college is located.
 */

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/colleges-info/collegelist")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setColleges(data.data);
        }
      })
      .catch((error) => console.error("Error fetching colleges:", error))
      .finally(() => setLoading(false));
  }, []);

  const getTagColor = (tag) => {
    switch (tag) {
      case "iit":
        return "bg-red-500";
      case "nit":
        return "bg-blue-500";
      case "iiit":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎓 Participate institutes
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colleges.map((college) => (
            <Card
              key={college.collegeId}
              className="shadow-lg hover:scale-105 transition-transform"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {college.collegeName}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Badge
                  className={`${getTagColor(
                    college.tag
                  )} text-white px-3 py-1 capitalize`}
                >
                  {college.tag.toUpperCase()}
                </Badge>
                <span className="text-sm text-gray-600">
                  📍 {college.collegeState}
                </span>
              </CardContent>
              <CardContent className="flex justify-end mt-2">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate(`/college/${college.collegeId}`)}
                >
                  Visit More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeList;
