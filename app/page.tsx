'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Revisi Bab 1 (Lagi)', done: false },
    { id: 2, text: 'Bales chat Dospem', done: false }
  ]);
  const [newTask, setNewTask] = useState('');

  // Minta izin notifikasi ke browser pas web dibuka
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const triggerNotif = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      // Daftar komen/meme random ala Gen Z 💀
      const memeList = [
        "WEY SKRIPSI WEY! Udah sejauh mana ngab? 😭",
        "Info loker admin slot? Yeuuu kerjain dulu itu Bab 4! 😡",
        "POV: Lu buka TikTok niatnya 5 menit, eh taunya 5 jam. DOSPEM NUNGGUIN WOY! 🏃‍♂️",
        "Turu teroooss. Ingat umur ngab, angkatan bawah udah pada wisuda tuh 🤡",
        "Ketik 1 kata aja hari ini udah dihitung proges kok. Ayo buka Word-nya! ☕",
        "Minimal bales chat dospem lah, jangan di-ghosting mulu. Berani bener 😭",
        "Gak papa nangis, yang penting sambil ngetik. GASSS! 🔥"
      ];

      // Ambil satu kalimat random
      const randomMeme = memeList[Math.floor(Math.random() * memeList.length)];

      new Notification('🚨 PERINGATAN DARURAT', {
        body: randomMeme,
        icon: 'https://em-content.zobj.net/source/apple/354/skull_1f480.png'
      });
    } else {
      alert('Yah, izin notifnya belum lu kasih bro. Gimana mau di-spam? 😭');
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask('');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden mt-10 border-2 border-black">
        
        {/* Header ala Meme */}
        <div className="bg-red-500 p-6 text-center text-white">
          <h1 className="text-3xl font-black uppercase tracking-tighter">POV: Lu Mahasiswa Akhir</h1>
          <p className="mt-2 text-sm italic">"Tinggal ngetik doang padahal, tapi berat banget ya Allah"</p>
        </div>

        <div className="p-6">
          {/* Target Section */}
          <div className="bg-yellow-200 p-4 rounded-xl border-2 border-black mb-6 transform rotate-1">
            <p className="text-sm font-bold text-gray-700">TARGET LULUS:</p>
            <p className="text-2xl font-black text-black">TAHUN INI (HARUSNYA)</p>
          </div>

          {/* Tombol Panik (Notifikasi) */}
          <button 
            onClick={triggerNotif}
            className="w-full bg-black text-white font-bold py-4 rounded-xl mb-6 hover:bg-gray-800 active:scale-95 transition-all flex justify-center items-center gap-2"
          >
            🔔 TES NOTIFIKASI PANIK
          </button>

          <hr className="my-6 border-dashed border-gray-400" />

          {/* To-Do List */}
          <h2 className="text-xl font-bold mb-4">Daftar Dosa Hari Ini 📝</h2>
          
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Mau ngerjain apa ngab?" 
              className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-black outline-none"
            />
            <button type="submit" className="bg-blue-600 text-white font-bold px-6 rounded-xl hover:bg-blue-700">
              GAS
            </button>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <label key={task.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-black"
                  checked={task.done}
                  onChange={() => {
                    setTasks(tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t))
                  }}
                />
                <span className={`${task.done ? 'line-through text-gray-400' : 'text-black font-medium'}`}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>

          {/* Meme Footer */}
          <div className="mt-8 text-center text-xs text-gray-400">
            <p>Dibikin pas lagi nunda ngerjain skripsi juga kan? Ngaku lu.</p>
          </div>
        </div>
      </div>
    </main>
  );
}