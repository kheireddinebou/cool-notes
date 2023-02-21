import { RequestHandler, Request, Response } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNote: RequestHandler = async (req, res) => {
  try {
    const title = req.body.title;
    const text = req.body.text;
    const userId = req.params.id;
    const savedNote = await NoteModel.create({
      title,
      text,
      userId,
    });
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateNote: RequestHandler = async (req, res) => {
  const noteId = req.query.noteId;
  try {
    const savedNote = await NoteModel.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    res.status(200).json(savedNote);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNote: RequestHandler = async (req, res) => {
  const noteId = req.query.noteId;
  try {
    await NoteModel.findByIdAndDelete(noteId);
    res.status(202).json("deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
