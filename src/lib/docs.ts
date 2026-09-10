// docs.ts — Isi dokumen kebijakan RAG yang diembed langsung di frontend

export interface PolicyDoc {
  id: string;
  title: string;
  emoji: string;
  content: string;
}

export const POLICY_DOCS: PolicyDoc[] = [
  {
    id: "cuti",
    title: "Kebijakan Cuti",
    emoji: "🏖️",
    content: `# Kebijakan Cuti — PT Nusantara Digital

## 1. Jenis Cuti
- **Cuti Tahunan**: 12 hari kerja per tahun, berlaku penuh setelah karyawan bekerja minimal 12 bulan.
- **Cuti Prorata**: karyawan dengan masa kerja 3–11 bulan mendapat cuti prorata, dihitung (jumlah bulan kerja / 12) x 12 hari, dibulatkan ke bawah.
- **Cuti di bawah 3 bulan masa kerja**: belum berhak cuti tahunan, hanya cuti sakit dengan surat dokter.
- **Cuti Menikah**: 3 hari kerja, sekali pakai selama masa kerja.
- **Cuti Melahirkan**: 3 bulan (90 hari kalender), dapat diajukan mulai 1 bulan sebelum HPL.
- **Cuti Duka**: 2 hari kerja untuk keluarga inti (orang tua, pasangan, anak, saudara kandung).

## 2. Prosedur Pengajuan
1. Ajukan minimal H-3 melalui sistem HR (kecuali cuti duka/sakit mendadak).
2. Atasan langsung wajib approve maksimal 1x24 jam kerja.
3. Cuti > 5 hari kerja berturut-turut butuh persetujuan tambahan dari Head of Department.

## 3. Sisa Cuti
- Sisa cuti tahunan dapat dibawa (carry-over) maksimal 6 hari ke tahun berikutnya, berlaku sampai akhir Maret tahun berjalan.
- Sisa cuti tidak dapat diuangkan, kecuali saat resign (pro-rata sesuai hari kerja tersisa).

## 4. Cuti Tanpa Gaji (Unpaid Leave)
- Dapat diajukan setelah cuti tahunan habis, maksimal 30 hari kalender per tahun.
- Membutuhkan persetujuan HRD dan Direktur.`,
  },
  {
    id: "reimbursement",
    title: "Kebijakan Reimbursement",
    emoji: "💰",
    content: `# Kebijakan Reimbursement — PT Nusantara Digital

## 1. Kategori dan Batas Klaim
| Kategori | Batas per Bulan | Catatan |
|---|---|---|
- Transportasi (non-WFH) | Rp 750.000 | Wajib lampirkan struk/bukti perjalanan |
- Pulsa & Kuota Internet | Rp 200.000 | Otomatis untuk semua karyawan tetap |
- Makan lembur (>2 jam lembur) | Rp 50.000/hari | Maks 10 hari per bulan |
- Kesehatan (di luar asuransi kantor) | Rp 500.000/tahun | Butuh resep/kwitansi dokter |
- Training & Sertifikasi | Rp 3.000.000/tahun | Wajib pre-approval dari manager sebelum ikut training |

## 2. Prosedur Klaim
1. Submit klaim melalui sistem finance maksimal 30 hari kalender setelah tanggal transaksi. Klaim lewat dari itu otomatis ditolak sistem.
2. Lampirkan bukti asli (foto/scan struk) — struk fotokopi tidak diterima.
3. Approval berjenjang: atasan langsung → Finance. Untuk klaim di atas Rp 1.000.000, wajib approval tambahan dari Head of Finance.
4. Reimbursement dicairkan setiap tanggal 25 bersamaan dengan payroll, untuk klaim yang disetujui sebelum tanggal 15 bulan berjalan.

## 3. Pengecualian
- Karyawan WFH penuh tidak berhak klaim transportasi, tapi berhak tunjangan internet penuh Rp 200.000 tanpa perlu struk.
- Karyawan kontrak/magang tidak berhak klaim training & sertifikasi.
- Biaya entertainment/jamuan klien menggunakan jalur reimbursement terpisah (Corporate Expense), bukan kategori di atas.`,
  },
  {
    id: "wfh",
    title: "SOP Work From Home",
    emoji: "🏠",
    content: `# SOP Work From Home (WFH) — PT Nusantara Digital

## 1. Eligibilitas
- Karyawan tetap dengan masa kerja minimal 6 bulan.
- Divisi yang diizinkan: Engineering, Product, Design, Data. Divisi Operasional & Customer Support tidak eligible kecuali kondisi khusus (force majeure, sakit dengan surat dokter).

## 2. Kuota WFH
- Karyawan reguler: maksimal 2 hari kerja per minggu.
- Karyawan dengan status "Remote-First" (disetujui khusus oleh Head of Division): dapat WFH penuh 5 hari/minggu.
- Kuota tidak dapat diakumulasi lintas minggu — jika minggu ini tidak dipakai, hangus.

## 3. Ketentuan Teknis
- Wajib online di Slack pada jam kerja inti: 09.00–16.00 WIB.
- Wajib mengaktifkan kamera saat daily standup dan meeting dengan klien eksternal.
- Laptop kantor wajib digunakan; dilarang bekerja menggunakan device pribadi untuk akses sistem internal.

## 4. Pengajuan
1. Ajukan H-1 melalui sistem HR untuk WFH reguler.
2. Untuk WFH mendadak (force majeure), notifikasi atasan langsung minimal sebelum jam 09.00 WIB di hari yang sama.
3. Atasan berhak menolak pengajuan WFH jika ada kebutuhan kehadiran fisik (misal: demo produk ke klien, audit).

## 5. Evaluasi
- Produktivitas selama WFH dievaluasi melalui laporan mingguan ke atasan langsung.
- Pelanggaran SOP (tidak online tanpa alasan, dsb) sebanyak 3x dalam sebulan mencabut hak WFH selama 1 bulan berikutnya.`,
  },
];
