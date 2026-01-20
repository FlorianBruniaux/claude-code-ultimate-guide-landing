/**
 * Cowork Workflows index for global search
 * Source: https://github.com/FlorianBruniaux/claude-cowork-guide/tree/main/workflows
 */

const COWORK_BASE = 'https://github.com/FlorianBruniaux/claude-cowork-guide/blob/main/workflows/';

window.SEARCH_COWORK = [
    // === ADMINISTRATIVE WORKFLOWS (6) ===
    {
        id: 'workflow-invoice-generation',
        type: 'workflow',
        title: 'Invoice & Quote Generation',
        content: 'invoice quote estimate bill template tax ID header footer legal terms payment generate create PDF professional business',
        url: COWORK_BASE + 'invoice-generation.en.md'
    },
    {
        id: 'workflow-quote-to-invoice',
        type: 'workflow',
        title: 'Quote to Invoice Conversion',
        content: 'quote estimate convert transform invoice accepted approval finalize billing automation workflow',
        url: COWORK_BASE + 'quote-to-invoice.en.md'
    },
    {
        id: 'workflow-payment-reminders',
        type: 'workflow',
        title: 'Payment Reminders',
        content: 'payment reminder overdue late invoice collection escalation gentle firm legal follow-up automation',
        url: COWORK_BASE + 'payment-reminders.en.md'
    },
    {
        id: 'workflow-compliance-checklist',
        type: 'workflow',
        title: 'Compliance Document Checklist',
        content: 'compliance mandatory documents legal regulations contractor merchant certification insurance license OSHA verification',
        url: COWORK_BASE + 'compliance-checklist.en.md'
    },
    {
        id: 'workflow-client-followup',
        type: 'workflow',
        title: 'Client Follow-up Tracker',
        content: 'client follow-up tracker dashboard CRM prospect lead quote status pipeline Excel tracking sales',
        url: COWORK_BASE + 'client-followup-tracker.en.md'
    },
    {
        id: 'workflow-price-comparison',
        type: 'workflow',
        title: 'Supplier Price Comparison',
        content: 'price comparison supplier vendor quote cost analysis best deal procurement purchasing negotiation',
        url: COWORK_BASE + 'price-comparison.en.md'
    },

    // === COMMERCIAL WORKFLOWS (5) ===
    {
        id: 'workflow-prospect-research',
        type: 'workflow',
        title: 'Prospect Research',
        content: 'prospect research investigation company client Tax ID EIN revenue decision-maker LinkedIn background qualification',
        url: COWORK_BASE + 'prospect-research.en.md'
    },
    {
        id: 'workflow-quote-creation',
        type: 'workflow',
        title: 'Detailed Quote Creation',
        content: 'quote estimate proposal detailed pricing materials labor itemized professional scope terms conditions',
        url: COWORK_BASE + 'quote-creation.en.md'
    },
    {
        id: 'workflow-competitor-analysis',
        type: 'workflow',
        title: 'Competitor Analysis',
        content: 'competitor analysis benchmarking market research pricing comparison review strengths weaknesses local market',
        url: COWORK_BASE + 'competitor-analysis.en.md'
    },
    {
        id: 'workflow-presentation-slides',
        type: 'workflow',
        title: 'Commercial Presentations',
        content: 'presentation slides PowerPoint Keynote pitch client sales deck proposal meeting visual professional',
        url: COWORK_BASE + 'presentation-slides.en.md'
    },
    {
        id: 'workflow-newsletter',
        type: 'workflow',
        title: 'Customer Newsletter Creation',
        content: 'newsletter email marketing communication customer update news announcement campaign HTML template',
        url: COWORK_BASE + 'newsletter-creation.en.md'
    },

    // === PRODUCTION WORKFLOWS (5) ===
    {
        id: 'workflow-project-planning',
        type: 'workflow',
        title: 'Project Planning & Scheduling',
        content: 'project planning schedule Gantt chart timeline milestones tasks dependencies contractor construction resource allocation',
        url: COWORK_BASE + 'project-planning.en.md'
    },
    {
        id: 'workflow-inventory',
        type: 'workflow',
        title: 'Inventory Tracking',
        content: 'inventory stock tracking materials supplies reorder alert warehouse ABC Pareto management EOQ cycle count',
        url: COWORK_BASE + 'inventory-tracking.en.md'
    },
    {
        id: 'workflow-work-log',
        type: 'workflow',
        title: 'Daily Work Log',
        content: 'work log daily report site journal construction activity progress documentation legal proof field notes',
        url: COWORK_BASE + 'work-log.en.md'
    },
    {
        id: 'workflow-quality-checklist',
        type: 'workflow',
        title: 'Quality Control Checklist',
        content: 'quality control checklist inspection verification standards compliance contractor building codes NEC ASTM defect',
        url: COWORK_BASE + 'quality-checklist.en.md'
    },
    {
        id: 'workflow-supplier-order',
        type: 'workflow',
        title: 'Supplier Purchase Orders',
        content: 'purchase order PO supplier ordering procurement materials delivery terms payment vendor management',
        url: COWORK_BASE + 'supplier-order.en.md'
    },

    // === COMMUNICATION WORKFLOWS (5) ===
    {
        id: 'workflow-social-media',
        type: 'workflow',
        title: 'Social Media Posts',
        content: 'social media post LinkedIn Facebook Instagram content marketing engagement brand awareness schedule hashtag',
        url: COWORK_BASE + 'social-media-posts.en.md'
    },
    {
        id: 'workflow-email-templates',
        type: 'workflow',
        title: 'Email Template Library',
        content: 'email template library reusable customer professional appointment confirmation reminder follow-up variable',
        url: COWORK_BASE + 'email-templates.en.md'
    },
    {
        id: 'workflow-review-response',
        type: 'workflow',
        title: 'Customer Review Responses',
        content: 'review response Google Facebook Yelp customer feedback rating positive negative reputation management',
        url: COWORK_BASE + 'review-response.en.md'
    },
    {
        id: 'workflow-presentation',
        type: 'workflow',
        title: 'Presentation Slides',
        content: 'presentation slides deck PowerPoint Keynote client meeting pitch visual design template professional',
        url: COWORK_BASE + 'presentation-slides.en.md'
    },
    {
        id: 'workflow-newsletter-comm',
        type: 'workflow',
        title: 'Newsletter Creation',
        content: 'newsletter customer communication email marketing update announcement campaign HTML design',
        url: COWORK_BASE + 'newsletter-creation.en.md'
    },

    // === ORGANIZATION WORKFLOWS (4) ===
    {
        id: 'workflow-file-org',
        type: 'workflow',
        title: 'File Organization',
        content: 'file organization folder structure naming convention sort clean archive digital workspace productivity',
        url: COWORK_BASE + 'file-organization.en.md'
    },
    {
        id: 'workflow-expense-tracking',
        type: 'workflow',
        title: 'Expense Tracking',
        content: 'expense tracking receipt accounting categorize Excel spreadsheet tax deduction financial record bookkeeping',
        url: COWORK_BASE + 'expense-tracking.en.md'
    },
    {
        id: 'workflow-meeting-prep',
        type: 'workflow',
        title: 'Meeting Preparation',
        content: 'meeting preparation agenda briefing client supplier minutes action items notes objective structured',
        url: COWORK_BASE + 'meeting-prep.en.md'
    },
    {
        id: 'workflow-knowledge-transfer',
        type: 'workflow',
        title: 'Knowledge Transfer & Training',
        content: 'knowledge transfer training apprentice documentation procedure skill tacit know-how onboarding succession expertise',
        url: COWORK_BASE + 'knowledge-transfer.en.md'
    },

    // === WORKFLOWS README ===
    {
        id: 'workflows-readme',
        type: 'guide',
        title: 'Cowork Workflows Directory',
        content: '25 workflows automation professional tasks administrative commercial production communication organization contractor merchant freelancer small business',
        url: COWORK_BASE + 'README.en.md'
    }
];
