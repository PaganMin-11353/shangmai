# SHANGMAI POLYMER WEBSITE

## TODO
 - [x] website logo is clipped
 - [x] mobile menu needs to be fixed.
 - [x] mobile menu icon go [icon website](www.heroicons.com).
 - [x]use bar3 and chvron-right


 - [ ] css and js needs to be tidied up from home.html or other html. needs double check.
 - [ ] header functionality is not consistent in every page, problems with default html maybe
 - [ ] deploy to github actions not done.
 - [ ] news _index.md is missing for 4 languages, currently hard coded grid in layouts.



## claude suggesetions TODO

### 🚨 CRITICAL PRIORITY (Business Breaking Issues)

#### 1. **FIX CONTACT FORM - CUSTOMERS LOST** 
- **Issue**: Contact form shows fake success but doesn't send anything (lines 386-388 in contact-form.html)
- **Impact**: All customer inquiries are silently dropped
- **Fix**: Replace fake setTimeout with actual form submission endpoint
- **Files**: `themes/shangmai-test/layouts/_shortcodes/contact-form.html`

#### 2. **REMOVE FAKE SEO DATA - SEARCH ENGINE PENALTIES**
- **Issue**: Hardcoded fake phone numbers and addresses in structured data (lines 67-144 baseof.html)
- **Impact**: Google will penalize site for fake business information
- **Fix**: Remove or replace with real company data from site config
- **Files**: `themes/shangmai-test/layouts/baseof.html`

#### 3. **ADD SECURITY HEADERS - VULNERABILITY PROTECTION**
- **Issue**: No Content-Security-Policy, X-Frame-Options, etc.
- **Impact**: Site vulnerable to XSS, clickjacking, content injection
- **Fix**: Add security headers in Hugo config or server config
- **Files**: `hugo.toml`, server configuration

### 🔥 HIGH PRIORITY (User Experience Killers)

#### 4. **FIX INAPPROPRIATE VISUAL DESIGN**
- **Issue**: Tech startup design (neon cyan, gaming backgrounds) for B2B manufacturing
- **Impact**: Industrial customers don't trust the business
- **Fix**: Professional industrial design with grays, blues, clean backgrounds
- **Files**: `themes/shangmai-test/layouts/index.html`, `themes/shangmai-test/assets/css/main.css`

#### 5. **FIX MOBILE NAVIGATION DISASTER**
- **Issue**: Tiny carousel controls, unreadable text, poor touch targets
- **Impact**: 60%+ of traffic can't use site on mobile
- **Fix**: Proper mobile-first responsive design
- **Files**: `themes/shangmai-test/layouts/_partials/header.html`, CSS mobile breakpoints

#### 6. **ADD TECHNICAL PRODUCT SPECIFICATIONS**
- **Issue**: Product cards have no technical specs, dimensions, materials
- **Impact**: B2B customers can't evaluate products
- **Fix**: Add detailed technical information to product data
- **Files**: `data/products.yml`, `themes/shangmai-test/layouts/products/`

### ⚠️ MEDIUM PRIORITY (Performance & Accessibility)

#### 7. **ELIMINATE PERFORMANCE BLOAT**
- **Issue**: 24KB CSS, 19KB JS loaded on every page regardless of need
- **Impact**: Slow loading, poor user experience
- **Fix**: Code splitting, remove unused CSS/JS, conditional loading
- **Files**: `themes/shangmai-test/assets/css/main.css`, `themes/shangmai-test/assets/js/main.js`

#### 8. **FIX ACCESSIBILITY VIOLATIONS**
- **Issue**: No ARIA labels on carousel, empty alt tags, no keyboard navigation
- **Impact**: Violates WCAG, excludes disabled users, fails government compliance
- **Fix**: Add proper ARIA labels, keyboard support, screen reader compatibility
- **Files**: `themes/shangmai-test/layouts/index.html`, carousel JavaScript

#### 9. **REMOVE DUPLICATE/REDUNDANT CODE**
- **Issue**: Duplicate shortcodes, 61 hardcoded colors bypassing design tokens
- **Impact**: Maintenance nightmare, inconsistent styling
- **Fix**: Consolidate shortcodes, use design tokens consistently
- **Files**: `themes/shangmai-test/layouts/_shortcodes/`, `themes/shangmai-test/layouts/shortcodes/`

### 📝 LOW PRIORITY (Code Quality)

#### 10. **REDUCE JAVASCRIPT INITIALIZATION BLOAT**
- **Issue**: 7 initialization functions run on every page load
- **Impact**: Unnecessary computation, slower page loads
- **Fix**: Conditional initialization based on page needs
- **Files**: `themes/shangmai-test/assets/js/main.js`

#### 11. **ADD PROPER ERROR HANDLING**
- **Issue**: No fallbacks for missing business data (names, descriptions, images)
- **Impact**: Broken layouts when data is incomplete
- **Fix**: Add Hugo template conditionals and fallbacks
- **Files**: All template files in `themes/shangmai-test/layouts/`

#### 12. **IMPLEMENT FORM CSRF PROTECTION**
- **Issue**: Contact forms vulnerable to cross-site request forgery
- **Impact**: Security vulnerability for form submissions
- **Fix**: Add CSRF tokens to all forms
- **Files**: `themes/shangmai-test/layouts/_shortcodes/contact-form.html`

---

### 📊 ESTIMATED IMPACT

| Priority | Issues | Business Impact | Development Time |
|----------|--------|-----------------|------------------|
| Critical | 3 items | Lost customers, SEO penalties | 2-3 days |
| High | 3 items | Poor user experience, mobile failure | 5-7 days |
| Medium | 3 items | Performance issues, compliance | 3-5 days |
| Low | 3 items | Code maintenance, technical debt | 2-4 days |

**Total Estimated Time: 12-19 days**

---

### 🎯 SUCCESS METRICS

#### Critical Success Indicators:
- [ ] Contact form successfully sends emails to business
- [ ] Google Search Console shows no fake data warnings
- [ ] Security headers pass security scan tools
- [ ] Mobile users can easily find contact information
- [ ] Site loads in under 3 seconds on 3G

#### Business Goals:
- [ ] B2B customers can quickly find technical product specs
- [ ] Professional appearance builds trust with industrial clients
- [ ] All customer inquiries reach the business
- [ ] Site works perfectly on all devices and assistive technology