const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true, unique: true, trim: true }, // 人員編號
    number: { type: String, trim: true }, // 番號
    name: { type: String, required: true, trim: true }, // 人員稱號
    fullName: { type: String, trim: true }, // 全名
    team: { type: String, required: true, enum: ['A班', 'B班'] },
    role: {
      type: String,
      required: true,
      enum: ['主管', '副主管', '小隊長', '隊員', '其他'],
    },
    period: { type: String, trim: true }, // 期別
    status: { type: String, required: true, enum: ['啟用', '停用'], default: '啟用' },
    canDrive: { type: Boolean, default: false }, // 開大車
    canRescue: { type: Boolean, default: false }, // 跑救護
    special1: { type: Boolean, default: false }, // 特編1
    special2: { type: Boolean, default: false }, // 特編2
    crossTeam: { type: Boolean, default: false }, // 可跨班編製
    participate: { type: Boolean, default: true }, // 參與隊員勤務
    canSupervisor: { type: Boolean, default: false }, // 可擔任當日主管
    weight: { type: Number, default: 100 }, // 排班權重
    qualifications: [{ type: String }], // 資格
    unavailableDates: [{ type: String }], // 不可排日期 (YYYY-MM-DD)
    specialDutyDates: [{ type: String }], // 特殊勤務日期 (YYYY-MM-DD)
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
