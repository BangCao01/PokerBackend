import mongoose, { Schema } from 'mongoose';

export interface Project {
  url: string;
  description: string;
  title: string;
  thumb_url: string;
  _id: mongoose.Schema.Types.ObjectId;
}

export type ProjectDocument = Project & mongoose.Document;

const projectSchema = new Schema({
  no: {
    type: Number,
    required: false,
    unique: false,
  },

  url: {
    type: String,
    required: true,
    unique: true,
  },

  thumb_url: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  created_date: {
    type: String,
    default: new Date().getTime(),
  },
  modified_date: {
    type: String,
    default: new Date().getTime(),
    required: false,
  },
});

const ProjectModel = mongoose.model<ProjectDocument>('Project', projectSchema);
export default ProjectModel;
