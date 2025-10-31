# ⚡ Quick Start - AI Chatbot

## 🚀 Get AI Running in 5 Minutes

### 1️⃣ Install (30 seconds)
```bash
cd backend
npm install
```

### 2️⃣ Get API Key (2 minutes)
1. Go to: https://huggingface.co/settings/tokens
2. Sign up (free)
3. Click "New token"
4. Copy token (starts with `hf_`)

### 3️⃣ Configure (30 seconds)
Add to `backend/.env`:
```env
HUGGINGFACE_API_KEY=hf_paste_your_token_here
```

### 4️⃣ Start (30 seconds)
```bash
npm run dev
```

### 5️⃣ Test (1 minute)
Open app, click chat button, ask:
```
"How do I plan a wedding for 200 guests?"
```

Look for 🤖 = AI working!

---

## ✅ That's It!

**Total Time**: 5 minutes  
**Cost**: $0 (FREE)  
**Result**: AI-powered chatbot with 7B parameter model  

---

## 📖 More Info

- **Full Guide**: `AI_CHATBOT_HUGGINGFACE_INTEGRATION.md`
- **Setup Details**: `SETUP_AI_CHATBOT.md`
- **Summary**: `AI_UPGRADE_SUMMARY.md`

---

## 🆘 Issues?

**No AI responses?**
- Check `.env` has `HUGGINGFACE_API_KEY`
- Restart server after adding key
- Check backend logs for errors

**Slow first response?**
- Normal! Model loads on first use (10-20s)
- Subsequent responses are fast (2-5s)

**Rate limit?**
- Free tier: 1000 requests/day
- Upgrade to Pro: $9/month unlimited

---

**Happy Chatting! 🎉**
