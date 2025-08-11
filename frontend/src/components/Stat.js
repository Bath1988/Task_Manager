import {useState, useEffect} from "react";

function Stat(){
const [stats, setStats] = useState([]);
    useEffect(() => {
        fetch('/api/stats')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    },[]);


return
    <div className='page'>     
        <Stat tasks={stats} setStats={setStats}/>
    </div>
}

export default Stat;