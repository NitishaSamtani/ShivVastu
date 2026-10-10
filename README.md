# Shiv Vastu — Full MERN Website

"Your source to Goodluck" — a responsive e-commerce/enquiry site for Vastu products
(Shank, Anklets, Crystals, Bracelets, Shivling, Festive items), workshops, and services,
with WhatsApp-based enquiries and a full Admin panel.

## Stack
- **Frontend:** React (Vite) + React Router + Tailwind CSS + Axios
- **Backend:** Node.js + Express + MongoDB (Mongoose) + JWT auth + Multer + Cloudinary (image uploads)

## Color Theme (from your logo)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#241E3D` | Nav bar, footer, dark sections |
| `primary` | `#4B3F8F` | Logo purple — buttons, links, bulk-order band |
| `gold` | `#E8A33D` | Logo sun-ray gold — CTAs, accents |
| `cream` | `#FBF6EC` | Page background |
| `sand` | `#F1E9D8` | Card/image placeholders |

Fonts: **Cormorant Garamond** (headings, temple-like elegance) + **Poppins** (body).

## Project Structure
```
shiv-vastu/
├── backend/          Express API + MongoDB models
│   ├── models/        Category, Product, Workshop, Service, Admin
│   ├── routes/        /api/auth, /categories, /products, /workshops, /services
│   ├── middleware/     JWT auth guard, Multer image upload
│   └── seed/seedAdmin.js   Creates the first admin login
└── frontend/         React app
    ├── src/pages/         Home, Categories, Product, Workshops, Services, Contact
    └── src/pages/admin/   Login, Dashboard, Manage Categories/Products/Workshops/Services
```

## Setup

### 1. MongoDB
Use a local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.
Copy the connection string — you'll need it below.

### 2. Cloudinary (image storage)
Uploaded images (categories, products, workshops, services) are stored on
[Cloudinary](https://cloudinary.com) rather than the backend's local disk — this
matters because hosts like Render's free tier wipe local files on every
restart/redeploy, which would silently delete all your uploaded photos.

1. Sign up free at [cloudinary.com](https://cloudinary.com).
2. On your [Dashboard](https://cloudinary.com/console), copy your **Cloud Name**,
   **API Key**, and **API Secret** — you'll need them in the next step.

### 3. Backend
```bash
cd backend
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_URL,
# and CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
npm install
npm run seed     # creates your first admin login using ADMIN_EMAIL/ADMIN_PASSWORD
npm run dev       # starts API on http://localhost:5000
```

### 4. Frontend
```bash
cd frontend
cp .env.example .env
# edit .env: set VITE_API_URL (your backend URL) and VITE_WHATSAPP_NUMBER
# (WhatsApp number in international format, no + or spaces, e.g. 919876543210)
npm install
npm run dev        # starts site on http://localhost:5173
```

### 5. Login to Admin Panel
Go to `http://localhost:5173/admin/login` and sign in with the email/password you
set in `backend/.env` before running `npm run seed`.

From there you can Add/Edit/Delete:
- **Categories** — Title, Image
- **Products** — Title, Category, Images, Price, Description
- **Workshops** — Title, Image, Description, Event Address, Event Time, Price
- **Services** — Title, Image, Description

## How the WhatsApp enquiry flow works
Every "Enquire Now" button (on Products, Workshops, and Services, plus the Bulk Order
card and the Contact form) opens `https://wa.me/<your number>?text=<pre-filled message>`
in a new tab. WhatsApp opens with the message about that exact product/workshop/service
already typed into the chat box — the visitor just taps **Send**. This logic lives in
`frontend/src/utils/whatsapp.js`, so you can edit the message templates in one place.

## Deploying
- **Backend:** Render, Railway, or any Node host + MongoDB Atlas for the database.
  Set the same env vars as `.env.example` in your host's dashboard — this
  includes the three `CLOUDINARY_*` keys, not just `MONGO_URI`/`JWT_SECRET`.
- **Frontend:** Vercel or Netlify. Set `VITE_API_URL` to your deployed backend's
  `/api` URL and `VITE_WHATSAPP_NUMBER` to your business WhatsApp number.
- Update `CLIENT_URL` in the backend `.env` to your deployed frontend's URL (for CORS).

## Notes / next steps you may want
- Add pagination if your product catalog grows large.
- Add a "change password" screen in Admin (schema supports it — `Admin.comparePassword`).
- Add image compression before upload if using large photos.
- Deleting or replacing an image (via Edit) doesn't remove the old file from
  Cloudinary — Cloudinary's free tier is generous, so this is rarely an issue,
  but you can clean up old assets periodically from the Cloudinary Media Library
  if it matters to you.
