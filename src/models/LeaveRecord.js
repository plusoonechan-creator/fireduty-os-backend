const mongoose = require('mongoose');

const leaveRecordSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true, ref: 'Member' }, // 請假人員番號
    leaveType: {
      type: String,
      required: true,
      enum: ['事假', '病假', '特休', '公假', '其他'],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['待審核', '已核准', '已駁回'],
      default: '待審核',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeaveRecord', leaveRecordSchema);
