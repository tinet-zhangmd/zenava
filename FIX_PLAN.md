# Logo Upload Persistence Issue Fix Plan

## Problem Analysis

### Current Issues:
1. **Data Structure Mismatch**: The admin panel V2 expects multi-language data (`allLanguageData[lang]`) but the database only has a single record (id=1) without language field
2. **API Inconsistency**: The navigation API ignores the `lang` parameter but the admin panel sends it
3. **State Management**: When uploading a logo, it updates `allLanguageData[currentLanguage]` but when loading data, it always gets the same id=1 record regardless of language

### Root Cause:
The navigation_config table has no language field, only one record with id=1 exists for all languages. This causes:
- When saving for 'en', it updates id=1
- When saving for 'jp', it overwrites id=1
- When saving for 'hk', it overwrites id=1 again
- When loading any language, it always gets id=1 (the last saved data)

## Solution Options

### Option 1: Single Configuration (Recommended - Simpler)
Keep one logo configuration for all languages (current database structure), fix the admin panel to handle it correctly.

**Pros:**
- No database schema changes needed
- Simpler to maintain
- Logo is usually the same across languages
- Matches current database structure

**Cons:**
- Cannot have different logos per language (rarely needed)

### Option 2: Multi-Language Support
Add language field to database and support different logos per language.

**Pros:**
- Full multi-language support
- Different logos per language possible

**Cons:**
- Requires database migration
- More complex logic
- More storage needed

## Implementation Plan (Option 1 - Recommended)

### Step 1: Fix Admin Panel Data Management
- Make navigation and footer logo shared across all languages
- When changing logo, update all language data simultaneously
- Remove language parameter from navigation/footer config APIs

### Step 2: Fix API Endpoints
- Remove language handling from navigation config API
- Keep single record approach (id=1)
- Ensure consistent behavior

### Step 3: Fix Data Loading
- When loading data, apply the same logo to all languages
- Prevent overwriting during save operations

## Files to Modify:
1. `/home/user/webapp/src/pages/admin/CommonContentManagementV2.tsx` - Admin panel logic
2. `/home/user/webapp/src/api/common-content.tsx` - API endpoints (if needed)