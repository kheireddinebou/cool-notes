import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notes";
import { verifyTokenAndAuthorisation } from "../controllers/verifyToken";

const router = express.Router();

router.get("/:id", verifyTokenAndAuthorisation, getNotes);
router.post("/:id", verifyTokenAndAuthorisation, createNote);
router.put("/:id", verifyTokenAndAuthorisation, updateNote);
router.delete("/:id", verifyTokenAndAuthorisation, deleteNote);

export default router;
