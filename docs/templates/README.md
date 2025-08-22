# Hugo Content Templates

This folder contains copy-paste templates for creating consistent product content.

## 📁 Template Files

### 1. `TEMPLATE_main_products_landing.md`
- **Target**: `content/products/_index.zh.md`
- **Purpose**: Main products page with category grid
- **Features**: Category grid with name + count + thumbnail

### 2. `TEMPLATE_category_index.md`  
- **Target**: `content/products/{category}/_index.zh.md`
- **Purpose**: Category overview page
- **Features**: Category description + product listing

### 3. `TEMPLATE_individual_product.md`
- **Target**: `content/products/{category}/{product}/index.zh.md`  
- **Purpose**: Individual product page
- **Features**: Image + title + description (vertical stack)

## 🎯 Front Matter Structure

### Simplified Fields (As Agreed)
```yaml
title: "产品中文名称"
description: "产品描述"
category: "category-slug"  # For products only
image: "/images/products/category/product/main.jpg"
date: "2024-08-18"
draft: false
```

## 📂 Content Organization

### Hugo Page Structure
```
content/products/
├── _index.zh.md                    # Main landing (category grid)
├── polymer-molded/                 # Category (13 products)
│   ├── _index.zh.md                # Category index
│   ├── mecanum-wheel-roller/       # Product page bundle
│   │   ├── index.zh.md            # Product content
│   │   ├── main.jpg               # Main product image
│   │   └── thumb.jpg              # Thumbnail image
│   └── [other products...]
├── shock-absorber/                 # Category (7 products)
├── special-sealing/                # Category (11 products)  
├── industrial-oil-bladder/         # Category (2 products)
├── mixed-rubber/                   # Category (1 product)
└── custom-products/                # Category (3 products)
```

### Image Organization
- **Path**: `content/products/{category}/{product}/main.jpg`
- **Hugo Access**: Page bundle resources (automatic)
- **Front Matter**: Full path `/images/products/{category}/{product}/main.jpg`

## 🚀 Usage Instructions

### Step 1: Copy Template
```bash
cp docs/templates/TEMPLATE_individual_product.md content/products/category/product-name/index.zh.md
```

### Step 2: Add Images
Place images in the same folder:
- `main.jpg` - Main product image
- `thumb.jpg` - Thumbnail (optional)

### Step 3: Fill Content
1. Update front matter fields
2. Replace placeholder content
3. Uncomment needed markdown sections
4. Add product-specific details

### Step 4: Preview
```bash
hugo server -D
```

## 📝 Content Guidelines

### Product Descriptions
- Keep descriptions focused and informative
- Include technical specs in markdown tables
- Use bullet points for features
- Add contact/inquiry calls-to-action

### Markdown Examples
Templates include commented examples for:
- Specification tables
- Feature lists  
- Application descriptions
- Technical parameters
- Contact information
- Hugo shortcodes

### SEO Best Practices
- Use descriptive titles in Chinese
- Include relevant keywords in descriptions
- Optimize image alt text
- Add structured content sections

## 🔧 Hugo Shortcodes Used

### Available Shortcodes (Theme Dependent)
- `{{< badge "text" >}}` - Highlight badges
- `{{< cta-button "text" "/link/" >}}` - Call-to-action buttons
- `{{< product-inquiry "product-slug" >}}` - Inquiry forms
- `{{< contact-info >}}` - Contact information block

### Custom Shortcodes Needed
You may need to create these in your theme:
- Product specification tables
- Image galleries
- Related products listing
- Category navigation

## 📊 Complete File List

**Total Files to Create: 46**
- 1 main products landing page
- 6 category index pages  
- 38 individual product pages
- 1 search page (optional)

### Category Breakdown
| Category | English Slug | Product Count |
|----------|--------------|---------------|
| 高分子模压制品 | polymer-molded | 13 |
| 高分子减震垫块 | shock-absorber | 7 |
| 特种密封制品 | special-sealing | 11 |
| 工业橡胶油囊 | industrial-oil-bladder | 2 |
| 混炼胶产品 | mixed-rubber | 1 |
| 非标定制产品 | custom-products | 3 |

## 🎨 Theme Integration Notes

### CSS Classes Expected
- `.product-grid` - Category grid layout
- `.product-card` - Individual product cards
- `.spec-table` - Specification tables
- `.product-gallery` - Image galleries

### Layout Files Needed
- `layouts/products/list.html` - Category listing
- `layouts/products/single.html` - Individual product
- `layouts/products/category.html` - Category index

---

*Ready-to-use templates for consistent, SEO-friendly product content!*