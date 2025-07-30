import type { Category } from '../types/category';

// Mock data cho việc test component khi chưa có API
export const mockCategories: Category[] = [
  {
    "id": 902,
    "name": "Development",
    "description": "Courses about develop web, app, etc",
    "subCategories": [
      {
        "id": 906,
        "name": "Web development",
        "description": "Courses about web",
        "subCategories": []
      },
      {
        "id": 907,
        "name": "Mobile development",
        "description": "Courses about Mobile app",
        "subCategories": [
          {
            "id": 911,
            "name": "Android",
            "description": "Courses about Android app",
            "subCategories": []
          },
          {
            "id": 912,
            "name": "IOS",
            "description": "Courses about IOS app",
            "subCategories": []
          },
          {
            "id": 913,
            "name": "Cross Platform",
            "description": "Courses about Cross Platform app",
            "subCategories": []
          }
        ]
      },
      {
        "id": 908,
        "name": "Desktop development",
        "description": "Courses about Desktop app",
        "subCategories": []
      },
      {
        "id": 914,
        "name": "Programming Language",
        "description": "Courses about Development Language",
        "subCategories": []
      }
    ]
  },
  {
    "id": 903,
    "name": "Business",
    "description": "Courses about Business",
    "subCategories": []
  },
  {
    "id": 904,
    "name": "Language",
    "description": "Courses about Language",
    "subCategories": []
  },
  {
    "id": 905,
    "name": "Security",
    "description": "Courses about Security",
    "subCategories": []
  }
];

export const mockApiResponse = {
  "statusCode": 200,
  "error": null,
  "message": "Call api Success",
  "data": mockCategories
};
