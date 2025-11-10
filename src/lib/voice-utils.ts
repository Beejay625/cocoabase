export interface VoiceNote {
  id: string;
  plantationId?: string;
  taskId?: string;
  audioBlob: Blob;
  transcript?: string;
  duration: number;
  recordedAt: Date;
  tags?: string[];
}

export const startRecording = async (): Promise<MediaRecorder | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    return recorder;
  } catch (error) {
    console.error("Failed to start recording:", error);
    return null;
  }
};

export const stopRecording = (recorder: MediaRecorder): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        resolve(event.data);
      }
    };
    recorder.onerror = reject;
    recorder.stop();
  });
};

export const createVoiceNote = (
  audioBlob: Blob,
  duration: number,
  plantationId?: string,
  taskId?: string
): VoiceNote => {
  return {
    id: `voice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    plantationId,
    taskId,
    audioBlob,
    duration,
    recordedAt: new Date(),
  };
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const getAudioDuration = (audioBlob: Blob): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(audioBlob);
    audio.src = url;
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    };
    audio.onerror = reject;
  });
};

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  return "Audio transcription requires speech recognition API integration";
};

export const playVoiceNote = (voiceNote: VoiceNote): Promise<void> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(voiceNote.audioBlob);
    audio.src = url;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    audio.onerror = reject;
    audio.play();
  });
};

export const getVoiceNotesByPlantation = (
  notes: VoiceNote[],
  plantationId: string
): VoiceNote[] => {
  return notes.filter((note) => note.plantationId === plantationId);
};

export const getVoiceNotesByTask = (
  notes: VoiceNote[],
  taskId: string
): VoiceNote[] => {
  return notes.filter((note) => note.taskId === taskId);
};

export const searchVoiceNotes = (
  notes: VoiceNote[],
  query: string
): VoiceNote[] => {
  const lowerQuery = query.toLowerCase();
  return notes.filter((note) => {
    return (
      note.transcript?.toLowerCase().includes(lowerQuery) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
};

export const getTotalRecordingTime = (notes: VoiceNote[]): number => {
  return notes.reduce((sum, note) => sum + note.duration, 0);
};

export const formatTotalRecordingTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};


