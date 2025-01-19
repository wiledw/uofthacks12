import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { RotateCw } from 'lucide-react';

interface UserData {
  x: number;
  y: number;
  name: string;
  email: string;
  instagram: string;
  discord: string;
}

const ScatterChartComponent = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [data, setData] = useState<UserData[]>([]);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/fetch-users?userId=google-oauth2|112302726238919361918');
      const fetchedData = await response.json();
      console.log('Fetched data:', fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getInstagramUsername = (url: string) => {
    return url.split('instagram.com/')[1] || url;
  };

  const handlePointClick = (event: {points: Array<{pointIndex: number}>}) => {
    if (event.points && event.points[0]) {
      const pointIndex = event.points[0].pointIndex;
      setSelectedUser(data[pointIndex]);
    }
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
    fetchData();
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
  }

  return (
    <div className="relative bg-transparent p-4">
      <button
        onClick={handleRefresh}
        className="absolute top-4 right-4 z-10 p-2 rounded-full
        bg-black border border-cyan-400/30 text-cyan-400 
        hover:bg-cyan-950/50 hover:text-cyan-300 
        transition-all duration-200 shadow-lg"
      >
        <RotateCw className="w-5 h-5" />
      </button>

      <Plot
        key={key}
        data={[
          {
            x: data.map((d) => d.x),
            y: data.map((d) => d.y),
            mode: "text+markers" as const,
            type: 'scatter',
            marker: {
              size: 30,
              color: "rgba(0, 255, 255, 0.6)",
              symbol: "circle",
              line: {
                color: "rgb(0, 191, 255)",
                width: 2,
              },
            },
            text: data.map(() => "👤"),
            textposition: "middle center" as const,
            hoverinfo: "none" as const,
          }
        ]}
        layout={{
          title: {
            text: "Your Pespectr Network",
            font: {
              family: "Arial, sans-serif",
              size: 24,
              color: "white",
            },
          },
          paper_bgcolor: "black",
          plot_bgcolor: "black",
          font: {
            family: "Arial, sans-serif",
            color: "white",
          },
          xaxis: {
            showgrid: true,
            gridcolor: "rgba(255, 255, 255, 0.1)",
            zeroline: false,
            showticklabels: false,
          },
          yaxis: {
            showgrid: true,
            gridcolor: "rgba(255, 255, 255, 0.1)",
            zeroline: false,
            showticklabels: false,
          },
          showlegend: false,
          margin: {
            l: 40,
            r: 60,
            t: 60,
            b: 40,
          },
        }}
        style={{
          width: "100%",
          height: "80vh",
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        onClick={handlePointClick}
      />

      {/* Modal Popup */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-cyan-400 rounded-lg p-6 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* User Info */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedUser.name}</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">📧</span>
                  <span>{selectedUser.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">📸</span>
                  <a 
                    href={selectedUser.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {getInstagramUsername(selectedUser.instagram)}
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">🎮</span>
                  <span>{selectedUser.discord}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScatterChartComponent;
