// ====== USER ======
module.exports.USER_ROLE = {
    CANDIDATE: 1,
    COMPANY: 2
}
// ====== END USER ======

// ====== COMPANY CANDIDATE ======
module.exports.COMPANY_CANDIDATE = {
    UNFOLLOW: 0,
    CAN_FOLLOW_COM: 1,
    COM_FOLLOW_CAN: 2,
    FOLLOW_EACHOTHER: 3
}

// ====== END COMPANY CANDIDATE ======

// ====== CANDIDATE ======
module.exports.GENDER = {
    NOT_SET: 0,
    MALE: 1,
    FEMALE: 2
}
// ====== END CANDIDATE ======


// ====== RECRUITMENT ======

module.exports.TYPE_CANDIDATE = {
    OFFICIAL: 1,
    PARTTIME: 2,
    FREELANCE: 3,
    INTERN: 4
}
module.exports.TYPE_POST = {
    DEFAULT: 0, // Chua duoc phan loai
    POSTING: 1, //dang Dang
    PAUSING: 2, //Tam dung
    EXPIRED: 3, // het han
}
module.exports.DELETED_RECRUITMENT = {
    NO: 0, //default
    YES: 1
}
module.exports.GENDER_REQUIREMENT = {
    MALE: 0,
    FEMALE: 1,
    BOTH: 2
}
// ====== END RECRUITMENT ======

// ====== START CAREER INFO ======
module.exports.TYPE_SALARY = {
    NEGOTIATION: 1, // thuong luong sau
    VND: 2,
    USD: 3
}
module.exports.JOB_TYPE = {
    OFFICIAL: 1,
    PARTTIME: 2,
    FREELANCE: 3,
    INTERN: 4
}
module.exports.DEGREE = {
    CHUA_TN: 1,
    TRUNG_HOC: 2,
    TRUNG_CAP: 3,
    CAO_DANG: 4,
    DAI_HOC: 5,
    SAU_DAI_HOC:6
}
module.exports.FOREIGN_LANGE = {
    VIET: 1,
    ANH: 2,
    PHAP: 3,
    DUC: 4,
    NGA: 5,
    TRUNG_QUOC: 6,
    HAN_QUOC: 7,
    NHAT: 8,
    KHAC: 9
}
module.exports.LEVEL_FOREIGN_LANGE = {
    NATIVE: 1,
    LOW: 2,
    MEDIUM: 3,
    HIGH: 4
}
// ====== END CAREER INFO ========