const mongoose = require('mongoose');

// Mirrors the existing Google Sheets dAction model (ActionRepository.gs FIXED_ITEMS).
// 請假／休假 are just two of these modes, not a separate leave workflow.
const DUTY_MODES = [
  '排定人員', '請假', '銷假', '休假', '外宿', '健康權',
  '搶困', '災害支援', '臨時派遣', '緊急勤務',
  '防災宣導', '各里宣導', '消防營', '安全查察', '水源查察', '外賓參訪',
  '義消常訓', '教育訓練', '宣導訓', '救護訓', '駕訓', '體技能訓練',
  '車檢', '車保養', '公務出勤',
  '值宿', '跨班支援', '互調班',
  '外勤',
];

const specialDutyActionSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // YYYY-MM-DD
    team: { type: String, required: true, enum: ['A班', 'B班'] },
    userId: { type: String, required: true, ref: 'Member' },
    mode: { type: String, required: true, enum: DUTY_MODES }, // 勤務項目
    category: {
      type: String,
      enum: ['daily', 'emergency', 'prevention', 'training', 'admin', 'custom'],
    },
    period: { type: String, required: true, enum: ['上午', '下午', '夜間', '全日'] },
    startTime: { type: String, trim: true }, // HH:mm，健康權用
    endTime: { type: String, trim: true },
    note: { type: String, trim: true },
    externalUnit: { type: String, trim: true }, // 外單位名稱／宣導里別／互調對象
    vehicleItem: { type: String, trim: true },
  },
  { timestamps: true }
);

specialDutyActionSchema.index({ userId: 1, date: 1, team: 1, mode: 1 }, { unique: true });

specialDutyActionSchema.statics.DUTY_MODES = DUTY_MODES;

module.exports = mongoose.model('SpecialDutyAction', specialDutyActionSchema);
