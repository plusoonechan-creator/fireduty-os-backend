const mongoose = require('mongoose');

const dailyDutySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true }, // 勤務日期
    team: { type: String, required: true, enum: ['A班', 'B班'] },
    supervisorId: { type: String, ref: 'Member' }, // 當日主管番號
    whiteRescueId: { type: String, ref: 'Member' }, // 白救
    secondShiftId: { type: String, ref: 'Member' }, // 二梯
    nightRescueId: { type: String, ref: 'Member' }, // 夜救
    lodgingId: { type: String, ref: 'Member' }, // 值宿
    specialDutySummary: { type: String, trim: true }, // 特殊勤務摘要
    warnings: [{ type: String }], // 缺員／衝突警示
  },
  { timestamps: true }
);

dailyDutySchema.index({ date: 1, team: 1 }, { unique: true });

module.exports = mongoose.model('DailyDuty', dailyDutySchema);
