"use client"

'use client'

import React, { useState } from 'react';
import { Copy, Check, Monitor, Smartphone, Tablet, Eye, Code, Link } from 'lucide-react';

export default function TailwindBuilder() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('builder');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [previewContent, setPreviewContent] = useState('Preview Text');
  const [elementType, setElementType] = useState('div');
  const [showCode, setShowCode] = useState(false);

  const elementTypes = {
    'div': { label: 'Div / Container', defaultContent: 'Container Element', icon: '📦' },
    'button': { label: 'Button', defaultContent: 'Click Me', icon: '🔘' },
    'input': { label: 'Input Field', defaultContent: '', icon: '📝' },
    'textarea': { label: 'Textarea', defaultContent: '', icon: '📄' },
    'card': { label: 'Card', defaultContent: 'Card Content', icon: '🎴' },
    'text': { label: 'Text / Paragraph', defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', icon: '📰' },
    'heading': { label: 'Heading', defaultContent: 'Main Heading', icon: '📌' },
    'image': { label: 'Image Box', defaultContent: '', icon: '🖼️' },
    'badge': { label: 'Badge / Tag', defaultContent: 'New', icon: '🏷️' },
    'alert': { label: 'Alert / Notification', defaultContent: 'This is an alert message!', icon: '⚠️' },
    'list': { label: 'List Item', defaultContent: 'List Item', icon: '📋' },
    'link': { label: 'Link / Anchor', defaultContent: 'Click Here', icon: '🔗' },
    'nav': { label: 'Navigation', defaultContent: 'Nav Item', icon: '🧭' },
    'form': { label: 'Form Group', defaultContent: '', icon: '📋' },
    'table': { label: 'Table Cell', defaultContent: 'Table Data', icon: '📊' }
  };

  const classCategories = {
    Layout: {
      Display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden'],
      Position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      Overflow: ['overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll'],
      'Z-Index': ['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50']
    },
    Flexbox: {
      'Flex Direction': ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'],
      'Justify Content': ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'],
      'Align Items': ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'],
      Gap: ['gap-0', 'gap-1', 'gap-2', 'gap-4', 'gap-6', 'gap-8']
    },
    Spacing: {
      Padding: ['p-0', 'p-1', 'p-2', 'p-4', 'p-6', 'p-8', 'p-12', 'px-4', 'py-4', 'pt-4', 'pb-4', 'pl-4', 'pr-4'],
      Margin: ['m-0', 'm-1', 'm-2', 'm-4', 'm-6', 'm-8', 'm-12', 'mx-4', 'my-4', 'mt-4', 'mb-4', 'ml-4', 'mr-4']
    },
    Sizing: {
      Width: ['w-auto', 'w-full', 'w-1/2', 'w-1/3', 'w-2/3', 'w-1/4', 'w-3/4', 'w-screen'],
      Height: ['h-auto', 'h-full', 'h-screen', 'h-16', 'h-32', 'h-64'],
      'Min/Max Width': ['min-w-0', 'min-w-full', 'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-full']
    },
    Typography: {
      'Font Size': ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'],
      'Font Weight': ['font-thin', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold'],
      'Text Align': ['text-left', 'text-center', 'text-right', 'text-justify'],
      'Text Color': ['text-white', 'text-black', 'text-gray-500', 'text-gray-700', 'text-blue-500', 'text-green-500', 'text-red-500']
    },
    Backgrounds: {
      'BG Color': ['bg-white', 'bg-black', 'bg-gray-100', 'bg-gray-200', 'bg-gray-800', 'bg-blue-500', 'bg-green-500', 'bg-red-500'],
      'BG Opacity': ['bg-opacity-0', 'bg-opacity-25', 'bg-opacity-50', 'bg-opacity-75', 'bg-opacity-100'],
      Gradient: ['bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-b', 'from-blue-500', 'via-purple-500', 'to-pink-500']
    },
    Borders: {
      'Border Width': ['border', 'border-0', 'border-2', 'border-4', 'border-8'],
      'Border Color': ['border-gray-300', 'border-gray-500', 'border-blue-500', 'border-green-500', 'border-red-500'],
      'Border Radius': ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full']
    },
    Effects: {
      'Box Shadow': ['shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'],
      Opacity: ['opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'],
      'Transition': ['transition', 'transition-all', 'duration-150', 'duration-300', 'duration-500'],
      'Hover Effects': ['hover:bg-gray-100', 'hover:scale-105', 'hover:shadow-lg']
    }
  };

  const componentTemplates = {
    // Buttons
    'Button Primary': { 
      element: 'button',
      classes: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300',
      content: 'Primary Button'
    },
    'Button Outline': { 
      element: 'button',
      classes: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-300',
      content: 'Outline Button'
    },
    'Button Icon': { 
      element: 'button',
      classes: 'bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg transition duration-300',
      content: '→'
    },
    
    // Cards
    'Card Simple': { 
      element: 'card',
      classes: 'bg-white rounded-xl shadow-lg p-6 border border-gray-200',
      content: 'Card Content'
    },
    'Card Hover': { 
      element: 'card',
      classes: 'bg-white rounded-xl shadow-md hover:shadow-2xl p-6 transition duration-300 transform hover:-translate-y-1',
      content: 'Hover Me!'
    },
    'Card Gradient': { 
      element: 'card',
      classes: 'bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-xl p-6 text-white',
      content: 'Gradient Card'
    },
    
    // Inputs
    'Input Modern': { 
      element: 'input',
      classes: 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition',
      content: ''
    },
    'Input Search': { 
      element: 'input',
      classes: 'w-full px-4 py-2 pl-10 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500',
      content: ''
    },
    
    // Badges
    'Badge Primary': { 
      element: 'badge',
      classes: 'inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full',
      content: 'New'
    },
    'Badge Pill': { 
      element: 'badge',
      classes: 'inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full border border-green-300',
      content: 'Active'
    },
    
    // Alerts
    'Alert Success': { 
      element: 'alert',
      classes: 'bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded',
      content: '✓ Success! Your changes have been saved.'
    },
    'Alert Error': { 
      element: 'alert',
      classes: 'bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded',
      content: '✕ Error! Something went wrong.'
    },
    'Alert Info': { 
      element: 'alert',
      classes: 'bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg',
      content: 'ℹ Information: Please read carefully.'
    },
    
    // Text Elements
    'Heading Large': { 
      element: 'heading',
      classes: 'text-4xl font-bold text-gray-900 mb-4',
      content: 'Main Title'
    },
    'Text Body': { 
      element: 'text',
      classes: 'text-gray-700 leading-relaxed text-base',
      content: 'This is body text with comfortable line height and spacing.'
    },
    'Text Gradient': { 
      element: 'heading',
      classes: 'text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
      content: 'Gradient Text'
    },
    
    // Navigation
    'Nav Link': { 
      element: 'link',
      classes: 'text-gray-700 hover:text-blue-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition',
      content: 'Navigation'
    },
    'Nav Active': { 
      element: 'link',
      classes: 'text-blue-500 bg-blue-50 font-medium px-4 py-2 rounded-lg',
      content: 'Active'
    },
    
    // Containers
    'Container Center': { 
      element: 'div',
      classes: 'max-w-6xl mx-auto px-4 py-8',
      content: 'Centered Container'
    },
    'Flex Center': { 
      element: 'div',
      classes: 'flex items-center justify-center min-h-screen bg-gray-100',
      content: 'Centered Content'
    },
    'Grid 3 Cols': { 
      element: 'div',
      classes: 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4',
      content: 'Grid Layout'
    },
    
    // Image Boxes
    'Image Rounded': { 
      element: 'image',
      classes: 'w-full h-64 object-cover rounded-xl shadow-lg',
      content: ''
    },
    'Avatar Circle': { 
      element: 'image',
      classes: 'w-16 h-16 rounded-full border-2 border-blue-500',
      content: ''
    },
    
    // Form Elements
    'Form Label': { 
      element: 'text',
      classes: 'block text-sm font-medium text-gray-700 mb-2',
      content: 'Input Label'
    },
    'Textarea': { 
      element: 'textarea',
      classes: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none',
      content: ''
    }
  };

  const toggleClass = (className) => {
    setSelectedClasses(prev => {
      if (prev.includes(className)) {
        return prev.filter(c => c !== className);
      }
      // Remove conflicting classes
      const prefix = className.split('-')[0];
      const filtered = prev.filter(c => !c.startsWith(prefix + '-') && c !== prefix);
      return [...filtered, className];
    });
  };

  const loadTemplate = (template) => {
    setSelectedClasses(template.classes.split(' '));
    setElementType(template.element);
    setPreviewContent(template.content);
  };

  const copyToClipboard = () => {
    const classString = selectedClasses.join(' ');
    navigator.clipboard.writeText(classString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyFullCode = () => {
    const classString = selectedClasses.join(' ');
    const htmlCode = generateHTMLCode(classString);
    navigator.clipboard.writeText(htmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateHTMLCode = (classes) => {
    const content = previewContent || elementTypes[elementType].defaultContent;
    switch(elementType) {
      case 'button':
        return `<button class="${classes}">${content}</button>`;
      case 'input':
        return `<input type="text" class="${classes}" placeholder="${content || 'Enter text...'}" />`;
      case 'textarea':
        return `<textarea class="${classes}" placeholder="${content || 'Enter text...'}"></textarea>`;
      case 'heading':
        return `<h1 class="${classes}">${content}</h1>`;
      case 'text':
        return `<p class="${classes}">${content}</p>`;
      case 'link':
        return `<a href="#" class="${classes}">${content}</a>`;
      case 'image':
        return `<div class="${classes} bg-gray-300 flex items-center justify-center text-gray-500">Image</div>`;
      case 'badge':
      case 'alert':
      case 'card':
      case 'nav':
      case 'list':
      case 'form':
      case 'table':
      default:
        return `<div class="${classes}">${content}</div>`;
    }
  };

  const renderPreview = () => {
    const classes = classString || 'bg-blue-500 text-white px-6 py-3 rounded-lg';
    const content = previewContent || elementTypes[elementType].defaultContent;
    
    switch(elementType) {
      case 'button':
        return <button className={classes}>{content}</button>;
      case 'input':
        return <input type="text" className={classes} placeholder={content || 'Enter text...'} />;
      case 'textarea':
        return <textarea className={classes} placeholder={content || 'Enter text...'} rows="4"></textarea>;
      case 'heading':
        return <h1 className={classes}>{content}</h1>;
      case 'text':
        return <p className={classes}>{content}</p>;
      case 'link':
        return <a href="#" className={classes}>{content}</a>;
      case 'image':
        return <div className={`${classes} bg-gray-300 flex items-center justify-center text-gray-500`}>🖼️ Image Placeholder</div>;
      case 'badge':
      case 'alert':
      case 'card':
      case 'nav':
      case 'list':
      case 'form':
      case 'table':
      default:
        return <div className={classes}>{content}</div>;
    }
  };

  const clearClasses = () => {
    setSelectedClasses([]);
  };

  const classString = selectedClasses.join(' ');

  const getPreviewWidth = () => {
    switch(previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">TailwindLab (Tailwind CSS Builder) by TeknoMaven</h1>
              <p className="text-sm text-gray-600 mt-1">Build Tailwind classes visually with live preview</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                  activeTab === 'builder' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Builder
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                  activeTab === 'templates' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Templates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
        
        {/* LEFT SIDE - PREVIEW (Fixed/Sticky) */}
        <div className="lg:w-2/5 xl:w-1/3 bg-white border-r border-gray-200 flex flex-col lg:sticky lg:top-[140px] lg:h-[calc(100vh-140px)] overflow-hidden">
          <div className="p-4 flex-1 flex flex-col overflow-auto">
            
            {/* Code Output */}
            <div className="bg-gray-900 rounded-xl p-4 mb-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs font-medium">Code:</span>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition flex items-center gap-1"
                  >
                    <Code size={12} />
                    {showCode ? 'Classes' : 'HTML'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearClasses}
                    className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition"
                  >
                    Clear
                  </button>
                  <button
                    onClick={showCode ? copyFullCode : copyToClipboard}
                    className="flex items-center gap-1 text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition"
                  >
                    {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <code className="text-green-400 text-xs break-all whitespace-pre-wrap block max-h-24 overflow-auto">
                {showCode 
                  ? (classString ? generateHTMLCode(classString) : `<${elementType === 'input' ? 'input' : 'div'} class="...">...</${elementType === 'input' ? '' : 'div'}>`)
                  : (classString || 'Select classes from categories...')
                }
              </code>
            </div>

            {/* Element Type Selector */}
            <div className="mb-4 flex-shrink-0">
              <label className="block text-gray-700 font-medium mb-2 text-sm">Element Type:</label>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-auto">
                {Object.entries(elementTypes).map(([type, config]) => (
                  <button
                    key={type}
                    onClick={() => {
                      setElementType(type);
                      setPreviewContent(config.defaultContent);
                    }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition ${
                      elementType === type
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={config.label}
                  >
                    <div className="text-base mb-1">{config.icon}</div>
                    <div className="text-xs truncate">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Controls */}
            <div className="mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-700 font-medium text-sm">Preview Mode:</span>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-1.5 rounded-lg transition ${
                    previewMode === 'desktop' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  title="Desktop"
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-1.5 rounded-lg transition ${
                    previewMode === 'tablet' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  title="Tablet"
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-1.5 rounded-lg transition ${
                    previewMode === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  title="Mobile"
                >
                  <Smartphone size={16} />
                </button>
              </div>
              <input
                type="text"
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Edit ${elementTypes[elementType].label} content...`}
              />
            </div>

            {/* Live Preview Area */}
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center overflow-auto min-h-[250px]">
              <div style={{ width: getPreviewWidth(), transition: 'all 0.3s' }} className="w-full">
                {renderPreview()}
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs flex-shrink-0">
              <p className="text-blue-800 font-medium mb-1">💡 Quick Tips:</p>
              <ul className="text-blue-700 space-y-1">
                <li>• Click classes to add/remove</li>
                <li>• Conflicting classes auto-replace</li>
                <li>• Use templates for quick start</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - CLASS BUILDER (Scrollable) */}
        <div className="lg:w-3/5 xl:w-2/3 overflow-y-auto">
          <div className="p-4">
            
            {activeTab === 'builder' ? (
              <div className="space-y-4">
                {Object.entries(classCategories).map(([categoryName, subcategories]) => (
                  <div key={categoryName} className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-blue-500 rounded"></span>
                      {categoryName}
                    </h3>
                    {Object.entries(subcategories).map(([subName, classes]) => (
                      <div key={subName} className="mb-3 last:mb-0">
                        <h4 className="text-xs font-semibold text-gray-600 mb-2">{subName}</h4>
                        <div className="flex flex-wrap gap-2">
                          {classes.map(className => (
                            <button
                              key={className}
                              onClick={() => toggleClass(className)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                selectedClasses.includes(className)
                                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                              }`}
                            >
                              {className}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Component Templates</h3>
                  <p className="text-gray-600 text-sm mb-4">Click to load template into builder</p>
                </div>
                
                {/* Group templates by category */}
                {Object.entries({
                  'Buttons': Object.entries(componentTemplates).filter(([name]) => name.includes('Button')),
                  'Cards': Object.entries(componentTemplates).filter(([name]) => name.includes('Card')),
                  'Inputs & Forms': Object.entries(componentTemplates).filter(([name]) => name.includes('Input') || name.includes('Textarea') || name.includes('Form')),
                  'Badges & Tags': Object.entries(componentTemplates).filter(([name]) => name.includes('Badge')),
                  'Alerts': Object.entries(componentTemplates).filter(([name]) => name.includes('Alert')),
                  'Typography': Object.entries(componentTemplates).filter(([name]) => name.includes('Heading') || name.includes('Text')),
                  'Navigation': Object.entries(componentTemplates).filter(([name]) => name.includes('Nav')),
                  'Containers & Layout': Object.entries(componentTemplates).filter(([name]) => name.includes('Container') || name.includes('Flex') || name.includes('Grid')),
                  'Images': Object.entries(componentTemplates).filter(([name]) => name.includes('Image') || name.includes('Avatar'))
                }).map(([category, templates]) => (
                  templates.length > 0 && (
                    <div key={category} className="mb-6">
                      <div className="bg-white rounded-xl shadow-md p-4">
                        <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-purple-500 rounded"></span>
                          {category}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {templates.map(([name, template]) => (
                            <div key={name} className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-800 text-sm">{name}</h5>
                                <button
                                  onClick={() => loadTemplate(template)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition"
                                >
                                  Load
                                </button>
                              </div>
                              <div className="bg-gray-50 rounded p-2 mb-2 min-h-[50px] flex items-center justify-center">
                                <div className={template.classes} style={{ fontSize: template.element === 'badge' ? '0.7rem' : '0.85rem' }}>
                                  {template.content || (template.element === 'input' ? '(input)' : template.element === 'image' ? '🖼️' : 'Preview')}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                  {elementTypes[template.element]?.icon} {template.element}
                                </span>
                              </div>
                              <code className="text-xs text-gray-600 break-all block overflow-hidden line-clamp-2">
                                {template.classes}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="text-center p-1 text-sm text-gray-500">
        <div>© 2024 TailwindLab. All rights reserved.</div>
        <div className="mt-1">
          Made with <span className="text-red-500">♥</span> by{' '}
          <a href="https://teknomaven.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-medium">
            TeknoMaven
          </a>
        </div>
      </footer>
    </div>
  );
}