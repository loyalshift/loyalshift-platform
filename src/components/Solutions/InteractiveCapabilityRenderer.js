// InteractiveCapabilityRenderer.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const outputAnimation = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: { opacity: 1, height: 'auto', marginTop: '1rem', transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } },
};

const InteractiveCapabilityRenderer = ({ capability, t, theme, product }) => {
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [pipelineStages, setPipelineStages] = useState([]);
  const [costParams, setCostParams] = useState({});

  // Reset state when capability changes
  useEffect(() => {
    setDemoInput('');
    setDemoOutput('');
    setPipelineStages([]);
    if (capability.options && capability.options.length > 0) {
      setSelectedOption(capability.options[0].value);
    } else {
      setSelectedOption('');
    }
    if (capability.type === 'costEstimatorDemo' && capability.parameters) {
        const initialParams = {};
        capability.parameters.forEach(p => initialParams[p.id] = p.defaultValue);
        setCostParams(initialParams);
    }
  }, [capability]);


  const handleGenerateData = () => {
    if (!selectedOption && capability.options?.length > 0) {
        setDemoOutput(t('capability.selectOptionError', 'Please select a data type.'));
        return;
    }
    setDemoOutput(t('capability.generating', `Generating sample ${selectedOption} data...\n\n`) +
      JSON.stringify({
        type: selectedOption,
        product_id: product.id,
        sample_id: `syn_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
        data_payload: selectedOption === 'users' ? { name: 'Jane Doe', email: 'jane.doe@example.com', age: 30, country: "USA" } :
              selectedOption === 'products' ? { name: 'Awesome Gadget X1', price: 199.99, stock: 150, category: "Electronics" } :
              { from_account: 'ACC001', to_account: 'ACC002', amount: 150.75, currency: "USD", status: "Completed" },
      }, null, 2)
    );
  };

  const handleAnalyzeSentiment = () => {
    if (!demoInput.trim()) {
      setDemoOutput(t('capability.inputTextError', 'Please enter some text to analyze.'));
      return;
    }
    let sentiment = "Neutral";
    let score = 0.5;
    const positiveWords = ["happy", "great", "amazing", "love", "excellent", "good"];
    const negativeWords = ["sad", "bad", "terrible", "hate", "poor", "awful"];
    
    positiveWords.forEach(word => { if (demoInput.toLowerCase().includes(word)) score += 0.2; });
    negativeWords.forEach(word => { if (demoInput.toLowerCase().includes(word)) score -= 0.2; });

    if (score > 0.7) sentiment = "Very Positive";
    else if (score > 0.55) sentiment = "Positive";
    else if (score < 0.3) sentiment = "Very Negative";
    else if (score < 0.45) sentiment = "Negative";
    
    score = Math.max(0, Math.min(1, score)).toFixed(2); // Clamp between 0 and 1

    setDemoOutput(t('capability.sentimentResult', `Analysis for: "${demoInput}"\n\nPredicted Sentiment: ${sentiment}\nConfidence Score: ${score}`));
  };

  const togglePipelineStage = (stageValue) => {
    setPipelineStages(prev => 
      prev.includes(stageValue) ? prev.filter(s => s !== stageValue) : [...prev, stageValue]
    );
  };
  useEffect(() => { // Update pipeline output when stages change
    if (capability.type === 'pipelineVisualizerDemo') {
        if (pipelineStages.length === 0) {
            setDemoOutput(t('capability.pipeline.selectStages', 'Select stages to visualize the pipeline.'));
            return;
        }
        const selectedStageObjects = pipelineStages.map(val => capability.options.find(opt => opt.value === val));
        const output = selectedStageObjects.map(s => t(s.labelKey, s.defaultLabel)).join(' -> ');
        setDemoOutput(t('capability.pipeline.flow', `Pipeline Flow: ${output}`));
    }
  }, [pipelineStages, capability, t]);


  const handleThreatScan = () => {
    if (!demoInput.trim()) {
        setDemoOutput(t('capability.threat.inputRequired', 'Please enter a filename or URL to scan.'));
        return;
    }
    const isUrl = demoInput.startsWith('http://') || demoInput.startsWith('https://') || demoInput.includes('.');
    const threats = ["No threats detected.", "Minor adware found.", "Potential phishing link.", "Malware signature detected!"];
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    setDemoOutput(t('capability.threat.scanning', `Scanning "${demoInput}"...\n\nResult: ${randomThreat}`));
  };

  const handleTestApiEndpoint = () => {
    if (!selectedOption) {
        setDemoOutput(t('capability.api.selectEndpoint', 'Please select an API endpoint.'));
        return;
    }
    const endpointDetails = capability.options.find(opt => opt.value === selectedOption);
    let mockRequest = {};
    let mockResponse = {};

    switch(selectedOption) {
        case 'get_users':
            mockRequest = { method: 'GET', path: '/users', headers: { 'Authorization': 'Bearer mock_token' }};
            mockResponse = { status: 200, body: [{id:1, name: 'Alice'}, {id:2, name: 'Bob'}]};
            break;
        case 'post_products':
            mockRequest = { method: 'POST', path: '/products', headers: { 'Authorization': 'Bearer mock_token', 'Content-Type': 'application/json'}, body: {name: 'New Gadget', price: 29.99}};
            mockResponse = { status: 201, body: {id:101, name: 'New Gadget', price: 29.99, status: 'created'}};
            break;
        case 'get_order_by_id':
            mockRequest = { method: 'GET', path: '/orders/xyz789', headers: { 'Authorization': 'Bearer mock_token' }};
            mockResponse = { status: 200, body: {orderId: 'xyz789', items: [{productId: 5, quantity: 2}], total: 59.98 }};
            break;
        default:
            mockResponse = { status: 404, body: { error: 'Endpoint not found' }};
    }
    setDemoOutput(
        `Request:\n${JSON.stringify(mockRequest, null, 2)}\n\n` +
        `Response:\n${JSON.stringify(mockResponse, null, 2)}`
    );
  };

  const handleCostParamChange = (paramId, value) => {
    setCostParams(prev => ({...prev, [paramId]: parseFloat(value) }));
  };
  useEffect(() => {
    if (capability.type === 'costEstimatorDemo') {
        let totalCost = 0;
        capability.parameters.forEach(p => {
            totalCost += (costParams[p.id] || 0) * p.unitCost;
        });
        setDemoOutput(t('capability.cost.estimated', `Estimated Monthly Cost: $${totalCost.toFixed(2)}`));
    }
  }, [costParams, capability, t]);


  const renderOutput = () => demoOutput && (
    <motion.pre
      key={product.id + "-output"} // Ensure re-render on product change
      variants={outputAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`p-3 ${theme.surface} rounded-md text-xs ${theme.textSecondary} whitespace-pre-wrap overflow-x-auto border ${theme.borderLight} shadow-sm`}
    >
      {demoOutput}
    </motion.pre>
  );

  switch (capability.type) {
    case 'dataGeneratorDemo':
      return (
        <div>
          <div className="mb-3">
            <label htmlFor={`data-type-select-${product.id}`} className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
              {t('capability.selectDataType', 'Select Data Type:')}
            </label>
            <select
              id={`data-type-select-${product.id}`}
              value={selectedOption}
              onChange={(e) => { setSelectedOption(e.target.value); setDemoOutput(''); }}
              className={`${theme.inputBase}`}
            >
              {capability.options.map(opt => (
                <option key={opt.value} value={opt.value}>{t(opt.labelKey, opt.defaultLabel)}</option>
              ))}
            </select>
          </div>
          <button onClick={handleGenerateData} className={`${theme.buttonPrimary} text-sm`}>
            {t('capability.generateSample', 'Generate Sample')}
          </button>
          {renderOutput()}
        </div>
      );

    case 'sentimentAnalyzerDemo':
      return (
        <div>
          <textarea
            value={demoInput}
            onChange={(e) => { setDemoInput(e.target.value); setDemoOutput(''); }}
            placeholder={t('capability.enterTextPlaceholder', "Enter text here (e.g., 'This product is amazing!')...")}
            className={`${theme.inputBase} mb-3 h-24 resize-y`}
          />
          <button onClick={handleAnalyzeSentiment} className={`${theme.buttonPrimary} text-sm`}>
            {t('capability.analyze', 'Analyze Sentiment')}
          </button>
          {renderOutput()}
        </div>
      );
    
    case 'pipelineVisualizerDemo':
      return (
        <div>
          <p className={`text-sm font-medium ${theme.textSecondary} mb-2`}>{t('capability.pipeline.selectInstructions', 'Toggle pipeline stages:')}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {capability.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => togglePipelineStage(opt.value)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors
                  ${pipelineStages.includes(opt.value)
                    ? `${theme.accentCyan} bg-cyan-500/10 border-cyan-500 font-semibold`
                    : `${theme.textSecondary} bg-slate-100 hover:bg-slate-200 border-slate-300`}
                `}
              >
                {t(opt.labelKey, opt.defaultLabel)}
              </button>
            ))}
          </div>
          {renderOutput()}
        </div>
      );

    case 'threatScannerDemo':
        return (
            <div>
                <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => { setDemoInput(e.target.value); setDemoOutput(''); }}
                    placeholder={t('capability.threat.inputPlaceholder', "e.g., suspicious.exe or example.com/malware")}
                    className={`${theme.inputBase} mb-3`}
                />
                <button onClick={handleThreatScan} className={`${theme.buttonPrimary} text-sm`}>
                    {t('capability.threat.scanButton', 'Scan Now')}
                </button>
                {renderOutput()}
            </div>
        );
    
    case 'apiEndpointTesterDemo':
        return (
            <div>
                <div className="mb-3">
                    <label htmlFor={`api-endpoint-select-${product.id}`} className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                        {t('capability.api.selectEndpointLabel', 'Select Mock Endpoint:')}
                    </label>
                    <select
                        id={`api-endpoint-select-${product.id}`}
                        value={selectedOption}
                        onChange={(e) => { setSelectedOption(e.target.value); setDemoOutput(''); }}
                        className={`${theme.inputBase}`}
                    >
                        {capability.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{t(opt.labelKey, opt.defaultLabel)}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleTestApiEndpoint} className={`${theme.buttonPrimary} text-sm`}>
                    {t('capability.api.testButton', 'Send Mock Request')}
                </button>
                {renderOutput()}
            </div>
        );

    case 'costEstimatorDemo':
        return (
            <div>
                {capability.parameters.map(param => (
                    <div key={param.id} className="mb-3">
                        <label htmlFor={`${param.id}-slider-${product.id}`} className={`block text-sm font-medium ${theme.textSecondary} mb-1`}>
                            {t(param.labelKey, param.defaultLabel)}: <span className={theme.textPrimary}>{costParams[param.id] || param.defaultValue}</span>
                        </label>
                        <input
                            type="range"
                            id={`${param.id}-slider-${product.id}`}
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            value={costParams[param.id] || param.defaultValue}
                            onChange={(e) => handleCostParamChange(param.id, e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                        />
                    </div>
                ))}
                {renderOutput()}
            </div>
        );

    default:
      return <p className={`${theme.textMuted} text-sm`}>{t('capability.notAvailable', 'Interactive demo not available for this selection.')}</p>;
  }
};

export default InteractiveCapabilityRenderer;
