import React, { useState } from "react";
import Plot from "react-plotly.js";
import { RotateCw } from 'lucide-react'; 

const ScatterChartComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [key, setKey] = useState(0); 

  const data = [
    {
      x: 10,
      y: 20,
      name: "Alice Johnson",
      email: "alice@example.com",
      instagram: "https://www.instagram.com/alice.codes",
      discord: "alice#1234",
    },
    {
      x: 15,
      y: 35,
      name: "Bob Smith",
      email: "bob@example.com",
      instagram: "https://www.instagram.com/bob.developer",
      discord: "bob#5678",
    },
    {
      x: 30,
      y: 25,
      name: "Charlie Brown",
      email: "charlie@example.com",
      instagram: "https://www.instagram.com/wil_edw",
      discord: "charlie#9012",
    },
    // ... other data points
  ];

  const getInstagramUsername = (url: string) => {
    return url.split('instagram.com/')[1];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointClick = (event: any) => {
    if (event.points && event.points[0]) {
      const pointIndex = event.points[0].pointIndex;
      setSelectedUser(data[pointIndex]);
    }
  };

   const handleRefresh = () => {
    setKey(prev => prev + 1); // Force re-render of the plot
  };


  return (
    <div className="relative bg-transparent p-4">
      <Plot
        data={[
          {
            x: data.map((d) => d.x),
            y: data.map((d) => d.y),
            mode: "markers+text",
            marker: {
              size: 30,
              color: "rgba(0, 255, 255, 0.6)",
              symbol: "circle",
              line: {
                color: "rgb(0, 191, 255)",
                width: 2,
              },
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            text: data.map((d) => "👤"),
            textposition: "center",
            hoverinfo: "none",
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
            r: 40,
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
                <div className="text-5xl mb-4">{selectedUser.avatar}</div>
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
