// Chuyến tàu Thống Nhất — đoàn tàu low-poly + tuyến đường sắt Bắc–Nam.
import * as THREE from 'three';

// ── Tuyến đường sắt Thống Nhất (xấp xỉ, kinh/vĩ độ các ga & điểm uốn) ──
export const RAIL_WAYPOINTS = [
  [105.84, 21.02], // 0  Ga Hà Nội ★
  [105.94, 20.55], //    Phủ Lý
  [106.0, 20.25],  // 2  Ga Ninh Bình ★
  [105.9, 19.9],
  [105.78, 19.81], // 4  Ga Thanh Hóa ★
  [105.72, 19.3],
  [105.67, 18.68], // 6  Ga Vinh ★ (Nghệ An)
  [105.72, 18.2],
  [106.05, 17.9],
  [106.42, 17.6],
  [106.62, 17.48], //    Đồng Hới
  [107.1, 16.83],  //    Đông Hà
  [107.58, 16.46], // 12 Ga Huế ★
  [108.0, 16.2],   //    đèo Hải Vân
  [108.21, 16.06], // 14 Ga Đà Nẵng ★
  [108.5, 15.55],
  [108.79, 15.12], //    Quảng Ngãi
  [109.05, 14.4],
  [109.1, 13.78],  //    Diêu Trì
  [109.28, 13.1],  //    Tuy Hòa
  [109.19, 12.25], // 20 Ga Nha Trang ★ (Khánh Hòa)
  [108.98, 11.6],  //    Tháp Chàm
  [108.5, 11.2],
  [107.9, 10.98],
  [107.25, 10.93], //    Long Khánh
  [106.85, 10.95], //    Biên Hòa
  [106.68, 10.79], // 26 Ga Sài Gòn ★
];

// 8 ga dừng: wp = chỉ số trong RAIL_WAYPOINTS, name = tên tỉnh trong dữ liệu
export const STATIONS = [
  { wp: 0, name: 'Hà Nội', station: 'Ga Hà Nội' },
  { wp: 2, name: 'Ninh Bình', station: 'Ga Ninh Bình' },
  { wp: 4, name: 'Thanh Hóa', station: 'Ga Thanh Hóa' },
  { wp: 6, name: 'Nghệ An', station: 'Ga Vinh' },
  { wp: 12, name: 'Huế', station: 'Ga Huế' },
  { wp: 14, name: 'Đà Nẵng', station: 'Ga Đà Nẵng' },
  { wp: 20, name: 'Khánh Hòa', station: 'Ga Nha Trang' },
  { wp: 26, name: 'TP. Hồ Chí Minh', station: 'Ga Sài Gòn' },
];

// ── Helper khối ──────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.rough ?? 0.7,
    metalness: opts.metal ?? 0.1,
    flatShading: true,
    ...(opts.emissive ? { emissive: opts.emissive, emissiveIntensity: opts.ei ?? 0.8 } : {}),
  });
}

function box(g, w, h, d, color, x, y, z, opts = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts));
  m.position.set(x, y, z);
  m.castShadow = true;
  g.add(m);
  return m;
}

// ── Đoàn tàu: đầu máy D19E xanh + 3 toa khách (mặt trước hướng +Z) ──
function makeLoco() {
  const g = new THREE.Group();
  box(g, 0.85, 0.16, 2.5, '#2b2f36', 0, 0.22, 0);          // gầm
  box(g, 0.62, 0.14, 0.62, '#1d2126', -0.0, 0.12, 0.75);   // giá chuyển hướng
  box(g, 0.62, 0.14, 0.62, '#1d2126', 0, 0.12, -0.75);
  box(g, 0.9, 0.62, 2.3, '#20599c', 0, 0.62, 0);           // thân xanh
  box(g, 0.92, 0.16, 2.32, '#e8e2d0', 0, 0.86, 0);         // sọc trắng
  box(g, 0.9, 0.3, 1.15, '#20599c', 0, 1.1, -0.35);        // khoang máy
  box(g, 0.82, 0.42, 0.66, '#2b6cb8', 0, 1.16, 0.62);      // ca-bin
  box(g, 0.7, 0.24, 0.06, '#101820', 0, 1.24, 0.96);       // kính lái
  box(g, 0.86, 0.08, 0.8, '#2b2f36', 0, 1.42, 0.55);       // nóc ca-bin
  // mũi dốc
  const nose = box(g, 0.88, 0.5, 0.5, '#20599c', 0, 0.62, 1.28);
  nose.rotation.x = -0.18;
  box(g, 0.4, 0.12, 0.1, '#d01e2a', 0, 0.4, 1.5);          // cản đỏ
  // đèn pha
  box(g, 0.16, 0.16, 0.06, '#ffe9a8', 0, 0.78, 1.52, { emissive: '#ffd76a', ei: 2.2 });
  return g;
}

function makeCar() {
  const g = new THREE.Group();
  box(g, 0.85, 0.14, 2.75, '#2b2f36', 0, 0.2, 0);
  box(g, 0.6, 0.13, 0.55, '#1d2126', 0, 0.11, 0.95);
  box(g, 0.6, 0.13, 0.55, '#1d2126', 0, 0.11, -0.95);
  box(g, 0.88, 0.6, 2.85, '#2b6cb8', 0, 0.6, 0);           // thân
  box(g, 0.9, 0.2, 2.87, '#e8e2d0', 0, 0.98, 0);           // dải trắng trên
  // dải cửa sổ sáng đèn hai bên
  for (const s of [-1, 1]) {
    box(g, 0.02, 0.2, 2.45, '#ffe9a8', s * 0.455, 0.72, 0, { emissive: '#ffd76a', ei: 1.1 });
  }
  box(g, 0.8, 0.14, 2.8, '#3a4148', 0, 1.15, 0);           // mái
  return g;
}

// Trả về Group chứa các toa; mỗi toa có userData.offset (khoảng lùi theo ray, đơn vị thế giới)
export function createTrain() {
  const train = new THREE.Group();
  const cars = [makeLoco(), makeCar(), makeCar(), makeCar()];
  const gaps = [0, 3.1, 6.05, 9.0];
  cars.forEach((c, i) => {
    c.userData.offset = gaps[i];
    train.add(c);
  });
  train.userData.cars = cars;
  return train;
}

// Đặt từng toa lên đường cong tại tiến độ uHead (0..1), toa sau lùi theo offset
export function placeTrain(train, curve, totalLen, uHead) {
  const tmp = new THREE.Vector3();
  for (const car of train.userData.cars) {
    const u = THREE.MathUtils.clamp(uHead - car.userData.offset / totalLen, 0, 1);
    const p = curve.getPointAt(u);
    const tan = curve.getTangentAt(u);
    car.position.copy(p);
    car.position.y += 0.1;
    tmp.copy(p).add(tan);
    car.lookAt(tmp);
  }
}

// ── Hải trình ra hai quần đảo (kinh/vĩ độ) ───────────────────
export const SEA_TRIPS = {
  'Đà Nẵng': {
    label: 'Hoàng Sa',
    owner: 'Thuộc thành phố Đà Nẵng',
    waypoints: [
      [108.25, 16.12],
      [109.3, 16.3],
      [110.6, 16.35],
      [111.6, 16.4],
    ],
  },
  'Khánh Hòa': {
    label: 'Trường Sa',
    owner: 'Thuộc tỉnh Khánh Hòa',
    waypoints: [
      [109.25, 12.2],
      [110.4, 11.4],
      [112.4, 10.6],
      [114.7, 10.05],
    ],
  },
};

// Tàu thủy nhỏ: thân trắng, vạch mớn nước đỏ, cabin, ống khói (mũi hướng +Z)
export function createShip() {
  const g = new THREE.Group();
  box(g, 0.7, 0.3, 2.3, '#e8e2d0', 0, 0.32, 0);            // thân
  box(g, 0.72, 0.12, 2.32, '#c23b2a', 0, 0.14, 0);         // mớn nước đỏ
  const bow = box(g, 0.5, 0.28, 0.5, '#e8e2d0', 0, 0.32, 1.25);
  bow.rotation.y = Math.PI / 4;                             // mũi nhọn
  box(g, 0.55, 0.35, 0.9, '#d8d2c2', 0, 0.62, -0.35);      // khoang
  box(g, 0.45, 0.3, 0.5, '#2b6cb8', 0, 0.92, -0.15);       // ca-bin lái
  box(g, 0.12, 0.35, 0.12, '#c23b2a', 0, 1.05, -0.62);     // ống khói
  // cờ đỏ đuôi tàu
  box(g, 0.03, 0.5, 0.03, '#c9c2b2', 0, 0.85, -1.05);
  box(g, 0.32, 0.2, 0.02, '#d01e2a', 0.18, 0.98, -1.05, { emissive: '#a00d18', ei: 0.4 });
  return g;
}

// Vệt vàng trên biển (không có đường ray nền)
export function createSeaTrail(curve) {
  const geo = new THREE.TubeGeometry(curve, TUBULAR, 0.14, RADIAL, false);
  const trail = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: '#ffcd00', roughness: 0.4,
    emissive: '#e8a80c', emissiveIntensity: 1.0,
  }));
  trail.geometry.setDrawRange(0, 0);
  return {
    trail,
    setProgress(u) {
      trail.geometry.setDrawRange(0, Math.floor(u * TUBULAR) * RADIAL * 6);
    },
  };
}

// Đặt tàu thủy tại tiến độ u trên hải trình; dir = -1 khi chạy chiều về
export function placeShip(ship, curve, u, dir = 1) {
  const p = curve.getPointAt(u);
  const tan = curve.getTangentAt(u).multiplyScalar(dir);
  ship.position.copy(p);
  ship.lookAt(p.clone().add(tan));
}

// ── Đường ray + vệt vàng "một dải non sông" hiện dần sau đuôi tàu ──
const TUBULAR = 600, RADIAL = 6;

export function createRailway(curve) {
  const railGeo = new THREE.TubeGeometry(curve, TUBULAR, 0.13, RADIAL, false);
  const rail = new THREE.Mesh(railGeo, new THREE.MeshStandardMaterial({
    color: '#4a4238', roughness: 0.9, metalness: 0.2,
  }));
  rail.receiveShadow = true;

  const trailGeo = new THREE.TubeGeometry(curve, TUBULAR, 0.17, RADIAL, false);
  const trail = new THREE.Mesh(trailGeo, new THREE.MeshStandardMaterial({
    color: '#ffcd00', roughness: 0.4,
    emissive: '#e8a80c', emissiveIntensity: 1.1,
  }));
  trail.geometry.setDrawRange(0, 0);

  return {
    rail,
    trail,
    setProgress(u) {
      trail.geometry.setDrawRange(0, Math.floor(u * TUBULAR) * RADIAL * 6);
    },
  };
}
