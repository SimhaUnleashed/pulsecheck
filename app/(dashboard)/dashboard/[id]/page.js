"use client"
import { TeamDashboard } from "../../../../components/dash/team-dashboard"
import { generateMockData } from "../../../../lib/mock-data"
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams();
  const [data, setData] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const mockData = await generateMockData(id);
      setData(mockData || "");
    };
    if (id) fetchData();
  }, [id]);

  return (
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
{data &&
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">PulseCheck Dashboard</h1>
        <TeamDashboard data={data} />
      </div>
      }
    </div>
    
  )
}