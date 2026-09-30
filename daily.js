(() => {
  'use strict';
  const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let lots=[],workspace=null,busy=false,opening=0;
  const canEdit=()=>['owner','editor'].includes(CultivoRepository.getCurrentWorkspace()?.role);
  async function open(type='observation',lotId='') {
    if(!canEdit())return;
    const token=++opening,id=CultivoRepository.getCurrentWorkspace()?.id;
    const values=await CultivoRepository.getAll('lots');if(token!==opening||id!==CultivoRepository.getCurrentWorkspace()?.id)return;
    lots=values.filter(l=>l.active);workspace=id;
    const form=$('dailyRecordForm');form.reset();form.elements.type.value=type;form.elements.at.value=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,16);
    form.elements.lotId.innerHTML='<option value="">Elegí una tanda</option>'+lots.map(l=>`<option value="${esc(l.id)}">${esc(l.name)}</option>`).join('');
    if(lotId)form.elements.lotId.value=lotId;else if(lots.length===1)form.elements.lotId.value=lots[0].id;
    $('dailyRecordMessage').textContent=lots.length?'':'Primero creá una tanda en Cultivos.';update();$('dailyRecordDialog').showModal();
  }
  function update(){const irrigation=$('dailyRecordForm').elements.type.value==='irrigation';$('dailyWaterFields').hidden=!irrigation;$('dailyWaterFields').querySelectorAll('input').forEach(n=>n.disabled=!irrigation);}
  function init(){
    $('dailyRecordForm').elements.type.innerHTML=Object.entries(DailyModels.TYPES).map(([id,label])=>`<option value="${id}">${label}</option>`).join('');
    $('dailyRecordForm').elements.type.addEventListener('change',update);
    document.addEventListener('click',async e=>{const b=e.target.closest('[data-daily-type]');if(!b)return;$('quickRegisterDialog').close();try{await open(b.dataset.dailyType,b.dataset.lotId)}catch(error){$('todayLoadMessage').textContent=error.message;$('todayLoadMessage').className='message show error';}});
    $('closeDailyRecord').onclick=()=>{if(!busy)$('dailyRecordDialog').close()};
    $('dailyRecordDialog').addEventListener('cancel',e=>{if(busy)e.preventDefault()});
    $('dailyRecordForm').addEventListener('submit',async e=>{e.preventDefault();if(busy)return;const form=e.currentTarget,message=$('dailyRecordMessage');
      try{
        if(!canEdit()||workspace!==CultivoRepository.getCurrentWorkspace()?.id)throw new Error('El proyecto cambió. Cerrá y volvé a abrir el registro.');
        const input=Object.fromEntries(new FormData(form)),payload=DailyModels.build(input,lots.find(l=>l.id===input.lotId));
        busy=true;e.submitter.disabled=true;message.textContent='Guardando…';
        if(payload.store==='irrigations')await CultivoRepository.createIrrigation(payload.value);
        else if(payload.store==='logs')await CultivoRepository.createOperationLog(payload.value);
        else await CultivoRepository.create(payload.store,payload.value);
        // The write has succeeded. Close before refreshing so a refresh failure cannot invite a duplicate submission.
        $('dailyRecordDialog').close();await GrowNavigation.showView('operations');Operations.filterLot(input.lotId);
        $('operationsMessage').textContent='Registro guardado. Ya está en el historial de la tanda.';$('operationsMessage').className='message show success';
      }catch(error){if($('dailyRecordDialog').open)message.textContent=error.message;else{$('operationsMessage').textContent='El registro se guardó, pero no pudimos actualizar el historial. Usá Actualizar.';$('operationsMessage').className='message show error';}}finally{busy=false;form.querySelector('[type=submit]').disabled=false;}
    });
    addEventListener('grow-workspace-changed',()=>{opening++;if(!busy)$('dailyRecordDialog').close()});
  }
  globalThis.GrowDaily=Object.freeze({init,open});
})();
