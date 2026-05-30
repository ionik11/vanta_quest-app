"use client";

declare global {
  interface Window {
    Telegram?: any;
  }
}
import { useState, useEffect } from "react";
import {
  Search,
  Folder,
  User,
  Lock,
  MapPinned,
  ArrowLeft,
} from "lucide-react";

export default function Home() {
useEffect(() => {
  if (typeof window !== "undefined") {
    window.Telegram?.WebApp?.ready();
  }
}, []);

const [user, setUser] = useState<any>(null);

useEffect(() => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();

    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }
}, []);
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("quest");

  const [nickname, setNickname] = useState("");
  const [savedName, setSavedName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [openedHint, setOpenedHint] = useState<number | null>(null);

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [foundScreen, setFoundScreen] = useState(false);
  
  const [hint2Unlocked, setHint2Unlocked] = useState(false);
  const [hint3Unlocked, setHint3Unlocked] = useState(false);

  const [hint2Time, setHint2Time] = useState("");
  const [hint3Time, setHint3Time] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
useEffect(() => {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 5);

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      setTimeLeft("00:00:00");
      clearInterval(interval);
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setTimeLeft(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  }, 1000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const storedName = localStorage.getItem("vanta_name");

  if (storedName) {
    setSavedName(storedName);
  }
}, []);
useEffect(() => {
  const hint2Date = new Date();
  hint2Date.setMinutes(hint2Date.getMinutes() + 2);

  const hint3Date = new Date();
  hint3Date.setMinutes(hint3Date.getMinutes() + 5);

  const interval = setInterval(() => {
    const now = new Date().getTime();

    const hint2Distance = hint2Date.getTime() - now;
    const hint3Distance = hint3Date.getTime() - now;

    if (hint2Distance <= 0) {
      setHint2Unlocked(true);
      setHint2Time("ОТКРЫТА");
    } else {
      const h = Math.floor((hint2Distance / (1000 * 60 * 60)) % 24);
      const m = Math.floor((hint2Distance / (1000 * 60)) % 60);
      const s = Math.floor((hint2Distance / 1000) % 60);

      setHint2Time(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }

    if (hint3Distance <= 0) {
      setHint3Unlocked(true);
      setHint3Time("ОТКРЫТА");
    } else {
      const h = Math.floor((hint3Distance / (1000 * 60 * 60)) % 24);
      const m = Math.floor((hint3Distance / (1000 * 60)) % 60);
      const s = Math.floor((hint3Distance / 1000) % 60);

      setHint3Time(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);
  if (loading) {
    return (
      <main className="h-screen bg-black relative overflow-hidden text-white flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h1 className="text-5xl font-bold tracking-[12px] text-yellow-500 mb-4">
            VANTA TEST
          </h1>

          <p className="text-gray-500 tracking-[4px] text-sm">
            INITIALIZING SYSTEM
          </p>
        </div>
      </main>
    );
  }

  if (!savedName) {
  return (
    <main className="h-screen bg-black relative overflow-hidden text-white flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-sm bg-[#111111] border border-yellow-600 rounded-3xl p-6 shadow-[0_0_35px_rgba(255,215,0,0.12)]">

        <h1 className="text-3xl font-bold text-yellow-500 mb-6 tracking-[6px] text-center">
          CREATE IDENTITY
        </h1>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter nickname"
          className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-4 text-white outline-none mb-5"
        />

        <button
          onClick={() => {
            if (nickname.trim()) {
              localStorage.setItem("vanta_name", nickname);
              setSavedName(nickname);
            }
          }}
          className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.35)]"
        >
          ENTER VANTA
        </button>
      </div>
    </main>
  );
}
  if (!entered) {
    return (
      <main className="h-screen bg-black relative overflow-hidden text-white flex items-center justify-center px-6">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]" />

        <div className="relative z-10 text-center">

          <h1 className="text-6xl font-bold tracking-[14px] text-yellow-500 mb-6">
            VANTA
          </h1>

          <p className="text-gray-400 tracking-[4px] text-sm mb-3">
            THE GAME HAS ALREADY STARTED
          </p>

          <p className="text-gray-600 text-sm mb-12">
            ACCESS THE SYSTEM
          </p>

          <button
            onClick={() => setEntered(true)}
            className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold px-10 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.35)]"
          >
            ENTER VANTA
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden text-white flex flex-col justify-center items-center px-6 py-8">
<div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,215,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">

  <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-yellow-500 rounded-full blur-sm animate-pulse" />

  <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-yellow-400 rounded-full blur-sm animate-ping" />

  <div className="absolute bottom-[20%] left-[10%] w-2 h-2 bg-yellow-500 rounded-full blur-md animate-pulse" />

  <div className="absolute bottom-[35%] right-[25%] w-1 h-1 bg-yellow-300 rounded-full blur-sm animate-ping" />

</div>
      <div className="w-full max-w-sm">

        {tab === "quest" && (
          <div className="bg-[#111111] rounded-3xl p-6 border border-yellow-600 shadow-[0_0_35px_rgba(255,215,0,0.12)]">

            <p className="text-yellow-500 text-sm mb-2 tracking-widest">
              QUEST #001
            </p>

            <h1 className="text-3xl font-bold mb-4 tracking-[6px] text-yellow-500">
              VANTA
            </h1>

            <button
              onClick={() => setShowHints(true)}
              className="relative overflow-hidden bg-[#0f0f0f] rounded-2xl h-52 mb-6 w-full border border-[#222]"
            >

              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,215,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">

                  <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 animate-pulse rounded-full" />

                  <MapPinned
                    size={40}
                    className="text-yellow-500 relative z-10"
                  />
                </div>
              </div>

              <div className="absolute top-3 right-3 text-gray-500 text-sm">
                открыть
              </div>
            </button>

            <p className="text-gray-400 mb-2">
              До окончания
            </p>

            <p className="text-2xl text-yellow-500 font-bold mb-6">
              {timeLeft}
            </p>

            <button
              onClick={() => {
                setShowModal(true);
                setCode("");
                setMessage("");
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-400 active:scale-[0.98] transition-all duration-300 text-black font-bold py-4 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.35)]"
            >
              ВВЕСТИ КОД
            </button>
          </div>
        )}

        {tab === "found" && (
          <div className="bg-[#111111] rounded-3xl p-6 border border-yellow-600 shadow-[0_0_35px_rgba(255,215,0,0.12)]">

            <h1 className="text-2xl font-bold text-yellow-500 mb-6 tracking-[4px]">
              FOUND
            </h1>

            <div className="space-y-4">

              <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222]">
                <p className="text-yellow-500 font-bold">
                  @shadowfinder
                </p>

                <p className="text-gray-400 text-sm">
                  Moscow • 22:14
                </p>
              </div>

              <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222]">
                <p className="text-yellow-500 font-bold">
                  @nightwalker
                </p>

                <p className="text-gray-400 text-sm">
                  Saint Petersburg • 01:43
                </p>
              </div>

            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="bg-[#111111] rounded-3xl p-6 border border-yellow-600 shadow-[0_0_35px_rgba(255,215,0,0.12)] text-center">

            <div className="w-24 h-24 rounded-full bg-yellow-500 mx-auto mb-6 shadow-[0_0_25px_rgba(255,215,0,0.35)]" />

            <h1 className="text-2xl font-bold text-yellow-500 mb-2">
             {savedName}
            </h1>

            <p className="text-gray-400 mb-6">
              ACCESS LEVEL 1
            </p>

            <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222]">
              <p className="text-gray-400 text-sm mb-2">
                Найдено карточек
              </p>

              <p className="text-3xl text-yellow-500 font-bold">
                2
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-around items-center bg-[#111111] border border-yellow-600 rounded-2xl py-4 mt-6 shadow-[0_0_20px_rgba(255,215,0,0.05)]">

          <button
            onClick={() => setTab("quest")}
            className={`flex flex-col items-center transition-all duration-300 ${
              tab === "quest"
                ? "text-yellow-500 scale-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                : "text-gray-500"
            }`}
          >
            <Search size={24} />
            <span className="text-xs mt-1">Квест</span>
          </button>

          <button
            onClick={() => setTab("found")}
            className={`flex flex-col items-center transition-all duration-300 ${
              tab === "found"
                ? "text-yellow-500 scale-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                : "text-gray-500"
            }`}
          >
            <Folder size={24} />
            <span className="text-xs mt-1">Найдено</span>
          </button>

          <button
            onClick={() => setTab("profile")}
            className={`flex flex-col items-center transition-all duration-300 ${
              tab === "profile"
                ? "text-yellow-500 scale-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                : "text-gray-500"
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Профиль</span>
          </button>
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">

          <div className="w-full max-w-sm bg-[#111111] border border-yellow-600 rounded-3xl p-6 shadow-[0_0_35px_rgba(255,215,0,0.15)]">

            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Ввод кода
            </h2>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Введите код"
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-4 text-white outline-none mb-4"
            />

            <button
              onClick={() => {
              if (code === "QUEST001") {
  setFoundScreen(true);

  setTimeout(() => {
    setFoundScreen(false);
    setShowModal(false);
  }, 3500);

} else {
  setMessage("НЕВЕРНЫЙ КОД");
}
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 active:scale-[0.98] text-black font-bold py-4 rounded-2xl mb-3"
            >
              ПОДТВЕРДИТЬ
            </button>

            {message && (
              <p
                className={`text-center text-sm mb-3 ${
                  message === "КАРТОЧКА НАЙДЕНА"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full text-gray-500 hover:text-white transition-all"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {showHints && (
        <div className="fixed inset-0 bg-black z-50 px-6 py-8 overflow-y-auto">

          <button
            onClick={() => setShowHints(false)}
            className="text-yellow-500 mb-8"
          >
            <ArrowLeft size={28} />
          </button>

          <h1 className="text-3xl font-bold text-yellow-500 mb-8 tracking-[4px]">
            ПОДСКАЗКИ
          </h1>

          <div className="space-y-5">

            <button
              onClick={() => setOpenedHint(1)}
              className="w-full bg-[#111111] border border-yellow-600 rounded-3xl p-5 text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-yellow-500 font-bold">
                  ПОДСКАЗКА 1
                </h2>

                <span className="text-green-500 text-sm">
                  ДОСТУПНА
                </span>
              </div>

              <div className="h-28 rounded-2xl bg-[#1A1A1A] border border-[#222]" />
            </button>

            {hint2Unlocked ? (
  <button
    onClick={() => setOpenedHint(2)}
    className="w-full bg-[#111111] border border-yellow-600 rounded-3xl p-5 text-left"
  >
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-yellow-500 font-bold">
        ПОДСКАЗКА 2
      </h2>

      <span className="text-green-500 text-sm">
        ДОСТУПНА
      </span>
    </div>

    <div className="h-28 rounded-2xl bg-[#1A1A1A] border border-[#222]" />
  </button>
) : (
  <div className="w-full bg-[#111111] border border-[#333] rounded-3xl p-5">

    <div className="flex items-center justify-between mb-3">
      <h2 className="text-gray-400 font-bold">
        ПОДСКАЗКА 2
      </h2>

      <Lock className="text-yellow-500" />
    </div>

    <p className="text-gray-500 text-sm">
      Откроется через:
    </p>

    <p className="text-yellow-500 text-2xl font-bold mt-2">
      {hint2Time}
    </p>

  </div>
)}
            {hint3Unlocked ? (
  <button
    onClick={() => setOpenedHint(3)}
    className="w-full bg-[#111111] border border-yellow-600 rounded-3xl p-5 text-left"
  >
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-yellow-500 font-bold">
        ПОДСКАЗКА 3
      </h2>

      <span className="text-green-500 text-sm">
        ДОСТУПНА
      </span>
    </div>

    <div className="h-28 rounded-2xl bg-[#1A1A1A] border border-[#222]" />
  </button>
) : (
  <div className="w-full bg-[#111111] border border-[#333] rounded-3xl p-5">

    <div className="flex items-center justify-between mb-3">
      <h2 className="text-gray-400 font-bold">
        ПОДСКАЗКА 3
      </h2>

      <Lock className="text-yellow-500" />
    </div>

    <p className="text-gray-500 text-sm">
      Откроется через:
    </p>

    <p className="text-yellow-500 text-2xl font-bold mt-2">
      {hint3Time}
    </p>

  </div>
)}
          </div>
        </div>
      )}
      {openedHint && (
        <div className="fixed inset-0 bg-black z-[60] px-6 py-8">

          <button
            onClick={() => setOpenedHint(null)}
            className="text-yellow-500 mb-8"
          >
            <ArrowLeft size={28} />
          </button>

          <h1 className="text-3xl font-bold text-yellow-500 mb-8 tracking-[4px]">
            ПОДСКАЗКА {openedHint}
          </h1>

          <div className="rounded-3xl overflow-hidden border border-yellow-600 shadow-[0_0_30px_rgba(255,215,0,0.12)]">

            <div className="h-[500px] bg-[#111111] flex items-center justify-center text-gray-500">
              photo hint
            </div>
          </div>

        </div>
      )}
{foundScreen && (
  <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">

    <div className="absolute w-[500px] h-[500px] bg-yellow-500 opacity-20 blur-[120px] animate-pulse rounded-full" />

    <div className="relative z-10 text-center animate-[pulse_2s_infinite]">

      <p className="text-yellow-500 tracking-[6px] text-sm mb-4">
        ACCESS GRANTED
      </p>

      <h1 className="text-5xl font-bold text-yellow-400 tracking-[10px] mb-6">
        CARD FOUND
      </h1>

      <div className="w-32 h-32 rounded-3xl border border-yellow-500 bg-[#111111]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(255,215,0,0.4)] flex items-center justify-center mx-auto">

        <div className="w-16 h-16 rounded-full bg-yellow-500 blur-sm animate-pulse" />

      </div>

      <p className="text-gray-500 mt-8 tracking-[4px] text-sm">
        VANTA SYSTEM UPDATED
      </p>
    </div>
  </div>
)}
    </main>
  );
}