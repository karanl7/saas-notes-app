const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

const prisma = new PrismaClient();
const router = express.Router();

// ✅ Protect all routes with JWT
router.use(authMiddleware);

// Create note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  // Enforce subscription limits
  const tenant = await prisma.tenant.findUnique({
    where: { id: req.user.tenantId },
    include: { notes: true },
  });

  if (tenant.plan === "FREE" && tenant.notes.length >= 3) {
    return res.status(403).json({ error: "Note limit reached. Please upgrade to Pro." });
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      tenantId: req.user.tenantId,
      userId: req.user.userId,
    },
  });

  res.json(note);
});

// List notes (tenant-only)
router.get("/", async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { tenantId: req.user.tenantId },
  });
  res.json(notes);
});

// Get single note
router.get("/:id", async (req, res) => {
  const note = await prisma.note.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!note || note.tenantId !== req.user.tenantId) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

// Update note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const note = await prisma.note.findUnique({ where: { id: parseInt(req.params.id) } });

  if (!note || note.tenantId !== req.user.tenantId) {
    return res.status(404).json({ error: "Note not found" });
  }

  const updated = await prisma.note.update({
    where: { id: note.id },
    data: { title, content },
  });

  res.json(updated);
});

// Delete note
router.delete("/:id", async (req, res) => {
  const note = await prisma.note.findUnique({ where: { id: parseInt(req.params.id) } });

  if (!note || note.tenantId !== req.user.tenantId) {
    return res.status(404).json({ error: "Note not found" });
  }

  await prisma.note.delete({ where: { id: note.id } });
  res.json({ message: "Note deleted" });
});

module.exports = router;
