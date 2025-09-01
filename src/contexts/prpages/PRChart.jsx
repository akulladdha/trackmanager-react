// /src/components/PRChart.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../authContext/index";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Label 
} from "recharts";

const PRChart = ({ event }) => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  function formatSecondsToTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  

  useEffect(() => {
    const fetchPRs = async () => {
      const prRef = collection(db, "users", currentUser.uid, "prs");
      const snapshot = await getDocs(prRef);
      const filtered = snapshot.docs
        .map(doc => doc.data())
        .filter(d => d.event === event && !d.isEventMarker)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setData(filtered);
    };
    
    if (currentUser && event) {
      fetchPRs();
    }
  }, [currentUser, event]);


  return data.length === 0 ? (
    <div>No data available for this event</div>
  ) : (
    <div style={{ width: '100%', height: '400px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{event} Progress Over Time</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          >
            <Label 
              value="Date" 
              position="bottom" 
              offset={0}
              style={{ textAnchor: 'middle' }}
            />
          </XAxis>
          <YAxis 
            tickFormatter={(value) => formatSecondsToTime(value)}
            domain={['dataMin', 'dataMax']}
          >
            <Label 
              value="Time" 
              angle={-90} 
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value) => formatSecondsToTime(value)}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Legend verticalAlign="top" height={36}/>
          <Line 
            type="monotone" 
            dataKey="time" 
            stroke="#00C896" 
            name="Personal Record"
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PRChart;
