import React from 'react';
import '../App.css';

function Card(item: string) {
  return (
    <div className="rounded overflow-hidden shadow-lg" style={{width:"100%", height:300, padding:10, backgroundColor:"#f6f6fb"}}>
    <img className="w-full" style={{height:200}} src="/img/card-top.jpg" alt="book"></img>
   

    <div className="bg-white">
    <div className="px-2 py-4">
      <p className="text-black-700 text-base">
      레이블라우스
      </p>
    </div>

    <div className="flex mb-4 self-end">
  <div className="w-1/2 bg-white-400 h-12 px-2 py-2" style={{color:"red"}}>10%</div>
  <div className="w-1/2 bg-white-500 h-12 self-end">
    57,600원 {item}
    </div>
</div>
</div>
    
  </div>
  );
}

export default Card;
