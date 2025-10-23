import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PostData {
  title: string;
  author: string;
  thumbnailUrl: string;
  content: string;
  category: string;
  registrationDate: string;
}

interface FormErrors {
  title: string | null;
  author: string | null;
  content: string | null;
}

const initialPostData: PostData = {
  title: '',
  author: '',
  thumbnailUrl: '',
  content: '',
  category: 'Công nghệ',
  registrationDate: '',
};

export const PostForm : React.FC = () => {
  const [postData, setPostData] = useState<PostData>(initialPostData);
  const [errors, setErrors] = useState<FormErrors>({ title: null, author: null, content: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setPostData(prev => ({
      ...prev,
      registrationDate: formattedDate,
    }));
  }, []);

  const validate = useCallback((data: PostData): FormErrors => {
    const newErrors: FormErrors = { title: null, author: null, content: null };

    if (!data.title || data.title.trim().length < 10) {
      newErrors.title = 'Tiêu đề bắt buộc và phải có ít nhất 10 ký tự.';
    }

    if (!data.author || data.author.trim().length < 3) {
      newErrors.author = 'Tác giả bắt buộc và phải có ít nhất 3 ký tự.';
    }

    if (!data.content || data.content.trim().length < 50) {
      newErrors.content = 'Nội dung bắt buộc và phải có ít nhất 50 ký tự.';
    }

    return newErrors;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(postData);
    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every(error => error === null);

    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionStatus('success');
        
        console.log('Bài viết đã được đăng:', postData);
        
        setTimeout(() => {
          setSubmissionStatus('idle');
          setPostData({ ...initialPostData, registrationDate: postData.registrationDate });
        }, 3000);

      }, 1500);
    } else {
      setSubmissionStatus('error');
    }
  };

  const handleCancel = () => {
    if (confirm('Bạn có chắc muốn hủy? Mọi dữ liệu chưa lưu sẽ bị mất.')) {
        setPostData({ ...initialPostData, registrationDate: postData.registrationDate });
        setErrors({ title: null, author: null, content: null });
        setSubmissionStatus('idle');
    }
  };

  const renderMessage = () => {
    if (submissionStatus === 'success') {
      return (
        <div style={{ border: '1px solid green', padding: '10px', backgroundColor: '#e6ffe6' }}>
          <CheckCircle style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <span>Đăng bài thành công! Đang chuyển về trang chủ...</span>
        </div>
      );
    }
    if (submissionStatus === 'error' && Object.values(errors).some(e => e !== null)) {
      return (
        <div style={{ border: '1px solid red', padding: '10px', backgroundColor: '#ffe6e6' }}>
          <XCircle style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <span>Vui lòng kiểm tra các lỗi validation bên dưới.</span>
        </div>
      );
    }
    return null;
  };

  const InputField: React.FC<{ 
    id: keyof PostData, 
    label: string, 
    type?: 'text' | 'textarea' | 'select', 
    minChar?: number, 
    required?: boolean,
    rows?: number
  }> = ({ id, label, type = 'text', minChar, required = false, rows = 10 }) => {
    const error = errors[id as keyof FormErrors];
    const isInvalid = !!error;
    const value = postData[id];
    
    const inputElement = type === 'textarea' ? (
      <textarea
        id={id as string}
        name={id as string}
        value={value}
        onChange={handleChange}
        rows={rows}
        style={{ border: isInvalid ? '1px solid red' : '1px solid black', width: '100%', padding: '5px' }}
        required={required}
        minLength={minChar}
      />
    ) : type === 'select' ? (
      <select
        id={id as string}
        name={id as string}
        value={value}
        onChange={handleChange}
        style={{ border: isInvalid ? '1px solid red' : '1px solid black', width: '100%', padding: '5px' }}
        required={required}
      >
        <option value="Công nghệ">Công nghệ</option>
        <option value="Du lịch">Du lịch</option>
        <option value="Ẩm thực">Ẩm thực</option>
        <option value="Đời sống">Đời sống</option>
        <option value="Khác">Khác</option>
      </select>
    ) : (
      <input
        type="text"
        id={id as string}
        name={id as string}
        value={value}
        onChange={handleChange}
        style={{ border: isInvalid ? '1px solid red' : '1px solid black', width: '100%', padding: '5px' }}
        required={required}
        minLength={minChar}
        placeholder={id === 'thumbnailUrl' ? "Ví dụ: https://example.com/image.jpg" : ""}
      />
    );

    return (
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor={id as string}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
          {minChar && <span> (Tối thiểu {minChar} ký tự)</span>}
        </label>
        {inputElement}
        {isInvalid && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{error}</p>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc' }}>
      <h1>Đăng Bài Viết Mới</h1>

      {renderMessage()}

      <form onSubmit={handleSubmit}>

        <InputField 
          id="title" 
          label="Tiêu đề" 
          minChar={10} 
          required
        />

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <InputField 
              id="author" 
              label="Tác giả" 
              minChar={3} 
              required
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <InputField 
              id="category" 
              label="Thể loại/Category" 
              type="select" 
              required
            />
          </div>
        </div>

        <InputField 
          id="thumbnailUrl" 
          label="URL ảnh Thumbnail" 
        />

        <InputField 
          id="content" 
          label="Nội dung bài viết" 
          type="textarea" 
          minChar={50} 
          required
          rows={10}
        />

        <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px', marginTop: '10px', fontSize: '14px' }}>
          Ngày đăng (Tự động): <span>{postData.registrationDate}</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          
          <button 
            type="button" 
            onClick={handleCancel} 
            disabled={isSubmitting}
            style={{ padding: '10px 20px' }}>
            Hủy
          </button>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
            {isSubmitting ? (
              <>
                <Loader2 style={{ width: '16px', height: '16px', marginRight: '5px' }} />
                Đang đăng...
              </>
            ) : (
              'Đăng bài'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

