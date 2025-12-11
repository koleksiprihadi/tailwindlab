'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Download, Undo2, Redo2, Trash2, Copy, Eye, Code, Plus, ChevronRight, ChevronDown, Layers } from 'lucide-react';

const TailwindBuilderDragDrop = () => {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [viewport, setViewport] = useState('desktop');
  const [showCode, setShowCode] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [collapsedNodes, setCollapsedNodes] = useState({});
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' or 'tree'
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [customName, setCustomName] = useState('');
  const [customClasses, setCustomClasses] = useState('');
  const [tempComponents, setTempComponents] = useState([]);
  const canvasRef = useRef(null);

  const componentLibrary = [
    {
      type: 'navbar',
      name: 'Navbar',
      icon: '🔝',
      defaultClasses: 'w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg',
      defaultContent: `<div class="container mx-auto px-6 py-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600">L</div>
      <span class="text-xl font-bold text-white">Logo</span>
    </div>
    <nav class="hidden md:flex items-center gap-6">
      <a href="#" class="text-white hover:text-blue-200 transition-colors font-medium">Home</a>
      <a href="#" class="text-white hover:text-blue-200 transition-colors font-medium">About</a>
      <a href="#" class="text-white hover:text-blue-200 transition-colors font-medium">Services</a>
      <a href="#" class="text-white hover:text-blue-200 transition-colors font-medium">Contact</a>
    </nav>
    <button class="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Sign In</button>
  </div>
</div>`,
      allowsChildren: false
    },
    {
      type: 'sidebar',
      name: 'Sidebar',
      icon: '📌',
      defaultClasses: 'w-64 h-screen bg-gray-900 text-white shadow-2xl',
      defaultContent: `<div class="p-6">
  <div class="flex items-center gap-3 mb-8">
    <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">A</div>
    <span class="text-xl font-bold">App Name</span>
  </div>
  <nav class="space-y-2">
    <a href="#" class="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
      <span>🏠</span>
      <span class="font-medium">Dashboard</span>
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
      <span>📊</span>
      <span class="font-medium">Analytics</span>
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
      <span>👥</span>
      <span class="font-medium">Users</span>
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
      <span>⚙️</span>
      <span class="font-medium">Settings</span>
    </a>
  </nav>
</div>
<div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
    <div class="flex-1">
      <div class="font-semibold text-sm">John Doe</div>
      <div class="text-xs text-gray-400">john@example.com</div>
    </div>
  </div>
</div>`,
      allowsChildren: false
    },
    {
      type: 'layout',
      name: 'Full Layout',
      icon: '🏗️',
      defaultClasses: 'flex h-screen',
      defaultContent: `<aside class="w-64 bg-gray-900 text-white shadow-2xl">
  <div class="p-6">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">A</div>
      <span class="text-xl font-bold">App Name</span>
    </div>
    <nav class="space-y-2">
      <a href="#" class="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
        <span>🏠</span>
        <span class="font-medium">Dashboard</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
        <span>📊</span>
        <span class="font-medium">Analytics</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
        <span>👥</span>
        <span class="font-medium">Users</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
        <span>⚙️</span>
        <span class="font-medium">Settings</span>
      </a>
    </nav>
  </div>
</aside>
<div class="flex-1 flex flex-col">
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="px-8 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-sm text-gray-500">Welcome back, John!</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <span class="text-xl">🔔</span>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
            <div>
              <div class="font-semibold text-sm text-gray-900">John Doe</div>
              <div class="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main class="flex-1 p-8 bg-gray-50 overflow-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl">📊</span>
          <span class="text-2xl font-bold text-gray-900">2,543</span>
        </div>
        <div class="text-sm text-gray-600">Total Users</div>
        <div class="text-xs text-green-600 font-semibold mt-2">↑ 12% from last month</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl">💰</span>
          <span class="text-2xl font-bold text-gray-900">$45.2K</span>
        </div>
        <div class="text-sm text-gray-600">Revenue</div>
        <div class="text-xs text-green-600 font-semibold mt-2">↑ 8% from last month</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <span class="text-3xl">⚡</span>
          <span class="text-2xl font-bold text-gray-900">98.5%</span>
        </div>
        <div class="text-sm text-gray-600">Performance</div>
        <div class="text-xs text-green-600 font-semibold mt-2">↑ 2% from last month</div>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
      <div class="text-sm text-gray-600">Your content goes here...</div>
    </div>
  </main>
</div>`,
      allowsChildren: false
    },
    {
      type: 'container',
      name: 'Container',
      icon: '📦',
      defaultClasses: 'p-8 bg-white rounded-lg shadow-md',
      defaultContent: '',
      allowsChildren: true
    },
    {
      type: 'button',
      name: 'Button',
      icon: '🔘',
      defaultClasses: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
      defaultContent: 'Click Me',
      allowsChildren: false
    },
    {
      type: 'card',
      name: 'Card',
      icon: '🎴',
      defaultClasses: 'p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border border-gray-200',
      defaultContent: '<h3 class="text-xl font-bold text-gray-800 mb-2">Card Title</h3><p class="text-gray-600">Card description goes here</p>',
      allowsChildren: true
    },
    {
      type: 'input',
      name: 'Input',
      icon: '📝',
      defaultClasses: 'px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none',
      defaultContent: '',
      placeholder: 'Enter text...',
      allowsChildren: false
    },
    {
      type: 'text',
      name: 'Heading',
      icon: '📰',
      defaultClasses: 'text-4xl font-bold text-gray-900',
      defaultContent: 'Heading Text',
      allowsChildren: false
    },
    {
      type: 'paragraph',
      name: 'Paragraph',
      icon: '📄',
      defaultClasses: 'text-base text-gray-700 leading-relaxed',
      defaultContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      allowsChildren: false
    },
    {
      type: 'image',
      name: 'Image',
      icon: '🖼️',
      defaultClasses: 'w-full h-48 object-cover rounded-lg',
      defaultContent: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600',
      allowsChildren: false
    },
    {
      type: 'flex',
      name: 'Flex Row',
      icon: '↔️',
      defaultClasses: 'flex flex-row gap-4 items-center',
      defaultContent: '',
      allowsChildren: true
    },
    {
      type: 'grid',
      name: 'Grid',
      icon: '⚡',
      defaultClasses: 'grid grid-cols-3 gap-4',
      defaultContent: '',
      allowsChildren: true
    },
    {
      type: 'badge',
      name: 'Badge',
      icon: '🏷️',
      defaultClasses: 'inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full',
      defaultContent: 'New',
      allowsChildren: false
    }
  ];

  const addToHistory = (newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newComponents)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const handleDragStart = (e, component) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const generateId = () => {
    return 'comp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const handleDrop = (e, parentId = null) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedComponent) return;

    const newComponent = {
      id: generateId(),
      type: draggedComponent.type,
      name: draggedComponent.name,
      classes: draggedComponent.defaultClasses,
      content: draggedComponent.defaultContent,
      placeholder: draggedComponent.placeholder,
      allowsChildren: draggedComponent.allowsChildren,
      children: []
    };

    let newComponents;
    if (parentId) {
      newComponents = addComponentToParent([...components], parentId, newComponent);
    } else {
      newComponents = [...components, newComponent];
    }

    setComponents(newComponents);
    addToHistory(newComponents);
    setDraggedComponent(null);
    setSelectedId(newComponent.id);
  };

  const addComponentToParent = (componentsArray, parentId, newComponent) => {
    return componentsArray.map(comp => {
      if (comp.id === parentId && comp.allowsChildren) {
        return { ...comp, children: [...(comp.children || []), newComponent] };
      } else if (comp.children && comp.children.length > 0) {
        return { ...comp, children: addComponentToParent(comp.children, parentId, newComponent) };
      }
      return comp;
    });
  };

  const updateComponent = (id, updates) => {
    const updateInArray = (componentsArray) => {
      return componentsArray.map(comp => {
        if (comp.id === id) {
          return { ...comp, ...updates };
        } else if (comp.children && comp.children.length > 0) {
          return { ...comp, children: updateInArray(comp.children) };
        }
        return comp;
      });
    };

    const newComponents = updateInArray(components);
    setComponents(newComponents);
    addToHistory(newComponents);
  };

  const deleteComponent = (id) => {
    const deleteFromArray = (componentsArray) => {
      return componentsArray.filter(comp => {
        if (comp.id === id) return false;
        if (comp.children && comp.children.length > 0) {
          comp.children = deleteFromArray(comp.children);
        }
        return true;
      });
    };

    const newComponents = deleteFromArray(components);
    setComponents(newComponents);
    addToHistory(newComponents);
    setSelectedId(null);
  };

  const duplicateComponent = (id) => {
    const findAndDuplicate = (componentsArray) => {
      const newArray = [];
      componentsArray.forEach(comp => {
        newArray.push(comp);
        if (comp.id === id) {
          const duplicate = JSON.parse(JSON.stringify(comp));
          duplicate.id = generateId();
          if (duplicate.children) {
            duplicate.children = duplicate.children.map(child => ({
              ...child,
              id: generateId()
            }));
          }
          newArray.push(duplicate);
        } else if (comp.children && comp.children.length > 0) {
          comp.children = findAndDuplicate(comp.children);
        }
      });
      return newArray;
    };

    const newComponents = findAndDuplicate(components);
    setComponents(newComponents);
    addToHistory(newComponents);
  };

  const getComponentById = (id, componentsArray = components) => {
    for (let comp of componentsArray) {
      if (comp.id === id) return comp;
      if (comp.children && comp.children.length > 0) {
        const found = getComponentById(id, comp.children);
        if (found) return found;
      }
    }
    return null;
  };

  const toggleNodeCollapse = (id) => {
    setCollapsedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const saveCustomComponent = () => {
    if (!customCode.trim()) {
      alert('Please enter some HTML code!');
      return;
    }

    const newTempComp = {
      id: 'temp-' + Date.now(),
      name: customName.trim() || 'Custom Component',
      icon: '✨',
      type: 'custom',
      code: customCode,
      classes: customClasses,
      timestamp: new Date().toISOString()
    };

    setTempComponents(prev => [...prev, newTempComp]);
    setCustomCode('');
    setCustomName('');
    setCustomClasses('');
    alert('Custom component saved! You can now drag it to canvas.');
  };

  const addCustomToCanvas = (tempComp) => {
    const newComponent = {
      id: generateId(),
      type: 'custom',
      name: tempComp.name,
      classes: tempComp.classes,
      content: tempComp.code,
      allowsChildren: false
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    addToHistory(newComponents);
    setSelectedId(newComponent.id);
  };

  const deleteCustomComponent = (id) => {
    setTempComponents(prev => prev.filter(c => c.id !== id));
  };

  const renderTreeNode = (comp, level = 0) => {
    const isSelected = selectedId === comp.id;
    const isCollapsed = collapsedNodes[comp.id];
    const hasChildren = comp.children && comp.children.length > 0;
    
    // Get icon - for custom components, use ✨, otherwise get from library
    let icon = '📦';
    if (comp.type === 'custom') {
      icon = '✨';
    } else {
      const libComp = componentLibrary.find(c => c.type === comp.type);
      if (libComp) icon = libComp.icon;
    }

    return (
      <div key={comp.id} className="select-none">
        <div
          onClick={() => setSelectedId(comp.id)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all group ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-slate-800 text-slate-300'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeCollapse(comp.id);
              }}
              className={`p-0.5 rounded hover:bg-slate-700 transition-colors ${
                isSelected ? 'text-white' : 'text-slate-400'
              }`}
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <span className="text-base">{icon}</span>
          <span className="flex-1 text-sm font-medium truncate">{comp.name}</span>
          
          <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
            isSelected ? 'opacity-100' : ''
          }`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateComponent(comp.id);
              }}
              className="p-1 rounded hover:bg-slate-700 transition-colors"
              title="Duplicate"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(comp.id);
              }}
              className="p-1 rounded hover:bg-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        
        {hasChildren && !isCollapsed && (
          <div>
            {comp.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const generateHTML = (componentsArray = components, indent = 0) => {
    const indentation = '  '.repeat(indent);
    let html = '';

    componentsArray.forEach(comp => {
      if (comp.type === 'custom') {
        // Handle custom components
        html += `${indentation}<div class="${comp.classes}">\n`;
        html += `${indentation}  ${comp.content}\n`;
        html += `${indentation}</div>\n`;
      } else if (comp.type === 'input') {
        html += `${indentation}<input class="${comp.classes}" placeholder="${comp.placeholder || ''}" />\n`;
      } else if (comp.type === 'image') {
        html += `${indentation}<img src="${comp.content}" class="${comp.classes}" alt="Image" />\n`;
      } else if (comp.type === 'button') {
        html += `${indentation}<button class="${comp.classes}">${comp.content}</button>\n`;
      } else {
        const tag = comp.type === 'text' ? 'h1' : comp.type === 'paragraph' ? 'p' : 'div';
        html += `${indentation}<${tag} class="${comp.classes}">`;
        
        if (comp.content && comp.content.includes('<')) {
          html += `\n${indentation}  ${comp.content}\n`;
        } else if (comp.content) {
          html += comp.content;
        }
        
        if (comp.children && comp.children.length > 0) {
          html += '\n' + generateHTML(comp.children, indent + 1) + indentation;
        }
        
        html += `</${tag}>\n`;
      }
    });

    return html;
  };

  const exportCode = () => {
    const html = generateHTML();
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Project</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-gray-50">
${html}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderComponent = (comp, isNested = false) => {
    const isSelected = selectedId === comp.id;
    
    // Handle custom components differently
    if (comp.type === 'custom') {
      return (
        <div
          key={comp.id}
          className={`relative ${comp.classes}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(comp.id);
          }}
        >
          <div 
            className={isSelected ? 'outline outline-4 outline-blue-500 outline-offset-2' : ''}
            dangerouslySetInnerHTML={{ __html: comp.content }}
          />
          
          {isSelected && (
            <div className="absolute -top-10 left-0 bg-gray-900 text-white px-3 py-1 rounded text-xs font-mono flex items-center gap-2 shadow-lg z-50">
              <span>{comp.name}</span>
              <button onClick={(e) => { e.stopPropagation(); duplicateComponent(comp.id); }} className="hover:text-blue-400">
                <Copy size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} className="hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      );
    }
    
    const Component = comp.type === 'input' ? 'input' : 
                     comp.type === 'image' ? 'img' :
                     comp.type === 'button' ? 'button' :
                     comp.type === 'text' ? 'h1' :
                     comp.type === 'paragraph' ? 'p' : 'div';

    const baseClasses = `${comp.classes} ${isSelected ? 'outline outline-4 outline-blue-500 outline-offset-2' : ''}`;

    return (
      <div
        key={comp.id}
        className={`relative ${comp.allowsChildren && !isNested ? 'min-h-[100px]' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId(comp.id);
        }}
        onDrop={(e) => comp.allowsChildren && handleDrop(e, comp.id)}
        onDragOver={comp.allowsChildren ? handleDragOver : undefined}
      >
        {comp.type === 'input' ? (
          <Component
            className={baseClasses}
            placeholder={comp.placeholder}
            readOnly
          />
        ) : comp.type === 'image' ? (
          <Component
            src={comp.content}
            className={baseClasses}
            alt="Component"
          />
        ) : (
          <Component className={baseClasses}>
            {comp.content && comp.content.includes('<') ? (
              <div dangerouslySetInnerHTML={{ __html: comp.content }} />
            ) : (
              comp.content
            )}
            {comp.children && comp.children.length > 0 && (
              comp.children.map(child => renderComponent(child, true))
            )}
          </Component>
        )}
        
        {isSelected && (
          <div className="absolute -top-10 left-0 bg-gray-900 text-white px-3 py-1 rounded text-xs font-mono flex items-center gap-2 shadow-lg z-50">
            <span>{comp.name}</span>
            <button onClick={(e) => { e.stopPropagation(); duplicateComponent(comp.id); }} className="hover:text-blue-400">
              <Copy size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} className="hover:text-red-400">
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const selectedComponent = selectedId ? getComponentById(selectedId) : null;

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
              <img src="https://teknomaven.com/logoputih.png" class="h-10 w-auto object-contain" alt="TeknoMaven Logo" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tailwind Builder
              </h1>
              <p className="text-xs text-slate-400">Visual CSS Editor by TeknoMaven</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-2 rounded transition-colors ${viewport === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Monitor size={18} />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-2 rounded transition-colors ${viewport === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Tablet size={18} />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-2 rounded transition-colors ${viewport === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Smartphone size={18} />
            </button>
          </div>

          <div className="w-px h-6 bg-slate-700" />

          <button
            onClick={undo}
            disabled={historyIndex === 0}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex === history.length - 1}
            className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo2 size={18} />
          </button>

          <div className="w-px h-6 bg-slate-700" />

          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-2 rounded-lg transition-colors ${showCode ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
            title="Toggle Code View"
          >
            {showCode ? <Eye size={18} /> : <Code size={18} />}
          </button>

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-400 hover:to-pink-500 transition-all flex items-center gap-2 shadow-lg"
            title="Create Custom Component"
          >
            <Plus size={18} />
            Custom
          </button>

          <button
            onClick={exportCode}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 shadow-lg"
          >
            <Download size={18} />
            Export HTML
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Component Library */}
        <aside className="w-72 bg-slate-900 border-r border-slate-700 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus size={16} />
              Components
            </h2>
            <div className="space-y-2">
              {componentLibrary.map((comp, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, comp)}
                  className="bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{comp.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{comp.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{comp.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Temporary Components Section */}
            {tempComponents.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  ✨ Custom Components
                </h2>
                <div className="space-y-2">
                  {tempComponents.map((comp) => (
                    <div
                      key={comp.id}
                      className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-700 rounded-lg p-4 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{comp.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">{comp.name}</div>
                          <div className="text-xs text-slate-400 mt-1">custom</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addCustomToCanvas(comp)}
                          className="flex-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded transition-colors"
                        >
                          Add to Canvas
                        </button>
                        <button
                          onClick={() => deleteCustomComponent(comp.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1 overflow-auto bg-slate-800 p-8">
          <div className="mx-auto transition-all duration-300" style={{ width: viewportWidths[viewport], maxWidth: '100%' }}>
            <div
              ref={canvasRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => setSelectedId(null)}
              className="bg-white rounded-xl shadow-2xl min-h-[600px] p-8 space-y-4"
            >
              {components.length === 0 ? (
                <div className="flex items-center justify-center h-[500px] border-4 border-dashed border-gray-300 rounded-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-xl font-semibold text-gray-600 mb-2">Drag & Drop Components Here</p>
                    <p className="text-sm text-gray-400">Start building your interface</p>
                  </div>
                </div>
              ) : (
                components.map(comp => renderComponent(comp))
              )}
            </div>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-80 bg-slate-900 border-l border-slate-700 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('tree')}
              className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'tree'
                  ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers size={16} />
              Tree
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'properties'
                  ? 'bg-slate-800 text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code size={16} />
              Properties
            </button>
          </div>

          {/* Tree View Tab */}
          {activeTab === 'tree' && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Component Tree</h2>
                <p className="text-xs text-slate-500 mt-1">Click to select, expand/collapse nested items</p>
              </div>
              
              {components.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-4xl mb-3 opacity-50">🌳</div>
                  <p className="text-sm text-slate-500">No components yet</p>
                  <p className="text-xs text-slate-600 mt-1">Drag components to canvas</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {components.map(comp => renderTreeNode(comp))}
                </div>
              )}
              
              {components.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Total Components:</span>
                      <span className="font-semibold text-slate-300">
                        {(() => {
                          const countComponents = (arr) => {
                            let count = arr.length;
                            arr.forEach(c => {
                              if (c.children) count += countComponents(c.children);
                            });
                            return count;
                          };
                          return countComponents(components);
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Root Level:</span>
                      <span className="font-semibold text-slate-300">{components.length}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="flex-1 overflow-y-auto">
              {selectedComponent ? (
                <div className="p-6">
                  <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Properties</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Component</label>
                      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex items-center gap-3">
                        <span className="text-2xl">
                          {selectedComponent.type === 'custom' ? '✨' : componentLibrary.find(c => c.type === selectedComponent.type)?.icon}
                        </span>
                        <span className="font-semibold">{selectedComponent.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Tailwind Classes</label>
                      <textarea
                        value={selectedComponent.classes}
                        onChange={(e) => updateComponent(selectedComponent.id, { classes: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        placeholder="Enter Tailwind classes..."
                      />
                      <p className="text-xs text-slate-400 mt-2">Separate classes with spaces</p>
                    </div>

                    {selectedComponent.type === 'custom' ? (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">HTML Content</label>
                        <textarea
                          value={selectedComponent.content}
                          onChange={(e) => updateComponent(selectedComponent.id, { content: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm font-mono text-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
                          placeholder="Enter HTML content..."
                        />
                        <p className="text-xs text-slate-400 mt-2">💡 Custom component with HTML content</p>
                      </div>
                    ) : selectedComponent.type !== 'image' && selectedComponent.type !== 'input' ? (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Content</label>
                        <textarea
                          value={selectedComponent.content}
                          onChange={(e) => updateComponent(selectedComponent.id, { content: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                          placeholder="Enter content or HTML..."
                        />
                      </div>
                    ) : null}

                    {selectedComponent.type === 'image' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Image URL</label>
                        <input
                          type="text"
                          value={selectedComponent.content}
                          onChange={(e) => updateComponent(selectedComponent.id, { content: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    )}

                    {selectedComponent.type === 'input' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Placeholder</label>
                        <input
                          type="text"
                          value={selectedComponent.placeholder || ''}
                          onChange={(e) => updateComponent(selectedComponent.id, { placeholder: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter placeholder..."
                        />
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-700 space-y-2">
                      <button
                        onClick={() => duplicateComponent(selectedComponent.id)}
                        className="w-full bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg p-3 font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Copy size={16} />
                        Duplicate
                      </button>
                      <button
                        onClick={() => deleteComponent(selectedComponent.id)}
                        className="w-full bg-red-600 hover:bg-red-700 rounded-lg p-3 font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex items-center justify-center h-full">
                  <div className="text-center text-slate-500">
                    <div className="text-4xl mb-3">👈</div>
                    <p className="text-sm">Select a component to edit its properties</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Code View Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold">Generated HTML Code</h3>
              <button
                onClick={() => setShowCode(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <pre className="text-sm font-mono text-cyan-400 bg-slate-950 p-6 rounded-lg overflow-x-auto">
                <code>{generateHTML()}</code>
              </pre>
            </div>
            <div className="p-6 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateHTML());
                  alert('Code copied to clipboard!');
                }}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-750 rounded-lg font-semibold transition-colors"
              >
                Copy Code
              </button>
              <button
                onClick={exportCode}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Export HTML
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Component Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Custom Component
                </h3>
                <p className="text-sm text-slate-400 mt-1">Paste your HTML/Tailwind code and preview it</p>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden flex">
              {/* Left Panel - Code Editor */}
              <div className="w-1/2 border-r border-slate-700 flex flex-col">
                <div className="p-6 space-y-4 overflow-y-auto">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Component Name *
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. Hero Section, Pricing Card..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Container Classes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customClasses}
                      onChange={(e) => setCustomClasses(e.target.value)}
                      placeholder="e.g. p-8 bg-white rounded-xl shadow-lg"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      HTML Code *
                    </label>
                    <textarea
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder={`<div class="text-center">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">
    Welcome to My Site
  </h1>
  <p class="text-lg text-gray-600">
    This is a custom component
  </p>
  <button class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Get Started
  </button>
</div>`}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-sm font-mono text-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[400px] resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      💡 Tip: Use Tailwind classes for styling. The code will be rendered with Tailwind CDN.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel - Preview */}
              <div className="w-1/2 flex flex-col">
                <div className="p-6 border-b border-slate-700">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Live Preview</h4>
                </div>
                <div className="flex-1 p-6 bg-slate-800 overflow-y-auto">
                  {customCode ? (
                    <div className="bg-white rounded-lg p-8 min-h-full">
                      <div 
                        className={customClasses}
                        dangerouslySetInnerHTML={{ __html: customCode }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <div className="text-6xl mb-4">✨</div>
                        <p className="text-slate-400">Your preview will appear here</p>
                        <p className="text-sm text-slate-600 mt-2">Start typing HTML code on the left</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 flex justify-between items-center">
              <div className="text-sm text-slate-400">
                <span className="font-semibold text-slate-300">{tempComponents.length}</span> custom component(s) saved
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCustomCode('');
                    setCustomName('');
                    setCustomClasses('');
                  }}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-750 rounded-lg font-semibold transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-750 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCustomComponent}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-400 hover:to-pink-500 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Plus size={18} />
                  Save Component
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindBuilderDragDrop;