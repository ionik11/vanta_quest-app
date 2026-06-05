"use client";

declare global {
  interface Window {
    Telegram?: any;
  }
}
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
  getDoc,
  query,
where,
getDocs,
} from "firebase/firestore";
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
      console.log("TG USER", tg.initDataUnsafe.user);
    }
  }
}, []);
console.log("TG", window.Telegram?.WebApp);
useEffect(() => {
  const tg = window.Telegram?.WebApp;
  console.log("TG", tg);
console.log("TG USER", tg?.initDataUnsafe?.user);

  if (tg) {
    tg.ready();

    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
      console.log("TG USER", tg.initDataUnsafe.user);
    }
  }
}, []);

useEffect(() => {
  console.log("USER DATA:", user);

  if (!user) return;

  const telegramName =
    user.username ||
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    `user_${user.id}`;

  localStorage.setItem("vanta_name", telegramName);
  setSavedName(telegramName);
}, [user]);
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
  const [foundCards, setFoundCards] = useState<string[]>([]);
  const [firebaseBalance, setFirebaseBalance] = useState(0);
  const [cardNumber, setCardNumber] = useState("");

  
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
  const loadUser = async () => {
    const storedName = localStorage.getItem("vanta_name");

    if (!storedName) return;

    setSavedName(storedName);

    const userDoc = await getDoc(
      doc(db, "users", storedName)
    );

    if (userDoc.exists()) {
      const data = userDoc.data();

      setFirebaseBalance(data.balance || 0);
    }
  };

  loadUser();
}, []);
useEffect(() => {
  const savedCards = localStorage.getItem("vanta_cards");

  if (savedCards) {
    setFoundCards(JSON.parse(savedCards));
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
  onClick={async () => {
    if (nickname.trim()) {

      localStorage.setItem("vanta_name", nickname);
      setSavedName(nickname);

      await setDoc(
        doc(db, "users", nickname),
        {
          nickname: nickname,
          balance: 0,
          cardsFound: 0,
        },
        { merge: true }
      );
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
  <div className="space-y-4">



    <div className="bg-[#111111] rounded-3xl p-6 border border-yellow-600 shadow-[0_0_35px_rgba(255,215,0,0.12)]">

      <p className="text-gray-400 text-sm mb-2">
        НАЙДЕНО КАРТ
      </p>

      <h1 className="text-4xl font-bold text-yellow-500">
        {foundCards.length}
      </h1>

    </div>

    {foundCards.map((card) => {

  const reward =
    card === "QUEST001"
      ? 5000
      : card === "QUEST002"
      ? 3000
      : 7000;

  return (
    <div
      key={card}
      className="bg-[#111111] rounded-3xl p-5 border border-yellow-600 shadow-[0_0_25px_rgba(255,215,0,0.12)]"
    >
      <div className="flex items-center justify-between mb-4">

        <div>
          <p className="text-gray-500 text-xs">
            CARD
          </p>

          <h2 className="text-yellow-500 text-xl font-bold">
            {card}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-xs">
            НАГРАДА
          </p>

          <p className="text-green-500 font-bold text-lg">
            +{reward} ₽
          </p>
        </div>

      </div>

      <button
        onClick={() => setOpenedHint(1)}
        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 transition-all text-black font-bold py-3 rounded-2xl"
      >
        ОТКРЫТЬ
      </button>

    </div>
  );
})}

  </div>
)}

        {tab === "profile" && (
          <>
          <div className="bg-[#111111] rounded-3xl p-6 border border-yellow-600 shadow-[0_0_35px_rgba(255,215,0,0.12)] text-center">

            <div className="w-24 h-24 rounded-full bg-yellow-500 mx-auto mb-6 shadow-[0_0_25px_rgba(255,215,0,0.35)]" />

            <h1 className="text-2xl font-bold text-yellow-500 mb-2">
  {savedName}
</h1>

<div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222] mb-4 mt-4">
  <p className="text-gray-400 text-sm mb-2">
    Баланс
  </p>

  <p className="text-3xl text-yellow-500 font-bold">
    {firebaseBalance} ₽
  </p>
  
  <input
  value={cardNumber}
  onChange={(e) => setCardNumber(e.target.value)}
  placeholder="Номер карты"
  className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-3 text-white outline-none mt-4"
/>

  <button
  onClick={async () => {
    const q = query(
  collection(db, "withdrawals"),
  where("user", "==", savedName),
  where("status", "==", "pending")
);

const existing = await getDocs(q);

if (!existing.empty) {
  alert("У вас уже есть заявка на вывод");
  return;
}

    if (firebaseBalance <= 0) {
      alert("Недостаточно средств");
      return;
    }

    if (cardNumber.length < 16) {
      alert("Введите номер карты");
      return;
    }

    await addDoc(collection(db, "withdrawals"), {
      user: savedName,
      amount: firebaseBalance,
      cardNumber: cardNumber,
      status: "pending",
      createdAt: new Date(),
    });

    alert("Заявка на вывод отправлена");
  }}
  className="w-full bg-green-600 hover:bg-green-500 transition-all text-white font-bold py-3 rounded-2xl mt-4"
>
  ВЫВЕСТИ СРЕДСТВА
</button>
</div>

<button
  onClick={() => {
    localStorage.removeItem("vanta_name");
    window.location.reload();
  }}
  className="w-full bg-red-600 hover:bg-red-500 transition-all text-white font-bold py-3 rounded-2xl mb-4"
>
  ВЫЙТИ ИЗ ПРОФИЛЯ
</button>

<button
  onClick={() => {
    localStorage.removeItem("vanta_cards");
    window.location.reload();
  }}
  className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all text-black font-bold py-3 rounded-2xl mb-4"
>
  СБРОСИТЬ КАРТОЧКИ
</button>

<div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222]">
  <p className="text-gray-400 text-sm mb-2">
    Найдено карточек
  </p>

              <p className="text-3xl text-yellow-500 font-bold">
                {foundCards.length}
              </p>
            </div>
          </div>
          <div className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#222] mt-4">

  <p className="text-gray-400 text-sm mb-3">
    Найденные карты
  </p>

  {foundCards.length === 0 ? (
    <p className="text-gray-500">
      Пока нет карт
    </p>
  ) : (
    <div className="space-y-2">
      {foundCards.map((card) => (
        <div
          key={card}
          className="bg-black border border-yellow-600 rounded-xl px-3 py-2 text-yellow-500"
        >
          {card}
        </div>
      ))}
    </div>
  )}
</div>
  </>
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
              onClick={async () => {
              if (code === "QUEST001") {

  if (foundCards.includes("QUEST001")) {
    setMessage("НАГРАДА УЖЕ ПОЛУЧЕНА");
    return;
  }

  setFoundScreen(true);

  addDoc(collection(db, "finds"), {
    card: "QUEST001",
    user: savedName,
    foundAt: new Date(),
  });

  await updateDoc(
    doc(db, "users", savedName),
    {
      balance: increment(5000),
      cardsFound: increment(1),
    }
  );

  setFirebaseBalance((prev) => prev + 5000);

  const updatedCards = [...foundCards, "QUEST001"];

  setFoundCards(updatedCards);

  localStorage.setItem(
    "vanta_cards",
    JSON.stringify(updatedCards)
  );

  setTimeout(() => {
    setFoundScreen(false);
    setShowModal(false);
  }, 3500);

} else if (code === "QUEST002") {

  setFoundScreen(true);

  if (!foundCards.includes("QUEST002")) {
    const updatedCards = [...foundCards, "QUEST002"];

    setFoundCards(updatedCards);

    localStorage.setItem(
      "vanta_cards",
      JSON.stringify(updatedCards)
    );
  }

  setTimeout(() => {
    setFoundScreen(false);
    setShowModal(false);
  }, 3500);

} else if (code === "QUEST003") {

  setFoundScreen(true);

  if (!foundCards.includes("QUEST003")) {
    const updatedCards = [...foundCards, "QUEST003"];

    setFoundCards(updatedCards);

    localStorage.setItem(
      "vanta_cards",
      JSON.stringify(updatedCards)
    );
  }

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

         <div className="rounded-3xl overflow-hidden border border-yellow-600 shadow-[0_0_30px_rgba(255,215,0,0.12)] p-4 bg-[#111111]">

  <img
  src={
    openedHint === 1
      ? "/hint1.jpg"
      : openedHint === 2
      ? "/hint2.jpg"
      : "/hint3.jpg"
  }
  alt="Hint"
  className="w-full rounded-2xl"
/>
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