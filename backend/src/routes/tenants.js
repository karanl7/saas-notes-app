const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

const prisma = new PrismaClient();
const router = express.Router();

// ✅ Protect routes with JWT
router.use(authMiddleware);

// Upgrade tenant plan (Admin only)
router.post("/:slug/upgrade", requireRole("ADMIN"), async (req, res) => {
  const { slug } = req.params;

  // Ensure admin belongs to this tenant
  const tenant = await prisma.tenant.findUnique({ where: { slug } });
  if (!tenant || tenant.id !== req.user.tenantId) {
    return res.status(403).json({ error: "You cannot upgrade this tenant" });
  }

  const updatedTenant = await prisma.tenant.update({
    where: { slug },
    data: { plan: "PRO" },
  });

  res.json({ message: `Tenant ${slug} upgraded to PRO`, tenant: updatedTenant });
});

module.exports = router;
