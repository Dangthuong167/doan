import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiZalo, SiGoogleplay, SiAppstore } from "react-icons/si";

function FooterExtra() {
  return (
    <div className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm text-gray-700">
        {/* Tổng đài hỗ trợ */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">
            Tổng đài hỗ trợ miễn phí
          </h3>
          <p>
            Mua hàng - bảo hành:{" "}
            <span className="font-bold text-black">1800.2097</span> (7h30 -
            22h00)
          </p>
          <p>
            Khiếu nại:{" "}
            <span className="font-bold text-black">1800.2063</span> (8h00 -
            21h30)
          </p>
          <h4 className="mt-4 font-semibold text-gray-900">
            Phương thức thanh toán
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <img src="https://images.seeklogo.com/logo-png/48/2/apple-pay-acceptance-mark-logo-png_seeklogo-480102.png" alt="Apple Pay" className="h-6" />
            <img src="https://thuonghieumanh.vneconomy.vn/upload/vnpay.png" alt="VNPAY" className="h-6" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCp0JctwLH5Hgagb0TY-xvAuWK2NCGU4fZgQ&s" alt="Momo" className="h-6" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPynD27LbXlPsbofv1AX-5ZXDn_XMGo-1TA&s" alt="ZaloPay" className="h-6" />
          </div>
        </div>

        {/* Thông tin & chính sách */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">
            Thông tin và chính sách
          </h3>
          <ul className="space-y-1">
            <li>Mua hàng & thanh toán Online</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Tra cứu hóa đơn điện tử</li>
            <li>Trung tâm bảo hành chính hãng</li>
            <li>VAT Refund</li>
          </ul>
        </div>

        {/* Dịch vụ khác */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">
            Dịch vụ và thông tin khác
          </h3>
          <ul className="space-y-1">
            <li>Khách hàng doanh nghiệp (B2B)</li>
            <li>Ưu đãi thanh toán</li>
            <li>Liên hệ hợp tác kinh doanh</li>
            <li>Tuyển dụng</li>
          </ul>
          <h4 className="font-bold mt-4">Mua sắm dễ dàng với App</h4>
          <div className="flex items-center gap-3 mt-2">
            <SiGoogleplay className="text-2xl text-black" />
            <SiAppstore className="text-2xl text-black" />
          </div>
        </div>

        {/* Kết nối mạng xã hội */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Kết nối với chúng tôi</h3>
          <div className="flex gap-3 text-lg">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTiktok className="hover:text-black cursor-pointer" />
            <SiZalo className="hover:text-blue-500 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>

          <h4 className="font-bold mt-4 mb-2">Website thành viên</h4>
          <ul className="space-y-1">
            <li>dienThoaiVui.vn</li>
            <li>CareS.vn</li>
            <li>SForum.vn</li>
          </ul>
        </div>

        {/* Đăng ký nhận tin */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">
            Đăng ký nhận tin khuyến mãi
          </h3>
          <p className="text-xs mb-2">
            Nhận ngay voucher 10% sau 24h cho khách hàng mới
          </p>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <input
            type="tel"
            placeholder="Nhập số điện thoại của bạn"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <label className="flex items-center gap-2 text-xs mb-3">
            <input type="checkbox" className="accent-red-500" /> Tôi đồng ý với
            điều khoản
          </label>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700">
            ĐĂNG KÝ NGAY
          </button>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-gray-500 text-xs border-t py-4">
        © 2025 Mobile Shop 
      </div>
    </div>
  );
}

export default FooterExtra;
