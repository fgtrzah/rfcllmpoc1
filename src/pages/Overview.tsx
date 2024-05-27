import React, { useEffect, useState } from 'react'
import './Overview.css'
import { useDatasets } from 'src/state'
import {
  AffiliationsContinent,
  NumAPCitations,
  NumCitations,
  NumDocAuths,
} from 'src/components'
import ScatterPlotComponent from 'src/components/ScatterPlot'

const Overview = (_props: React.PropsWithChildren) => {
  const { index, file, response, setFile } = useDatasets({
    file: 'affpoaauthorsdrafts.csv',
  })
  const data = [
    { x: 10, y: 30 },
    { x: 15, y: 25 },
    { x: 20, y: 19 },
    { x: 10, y: 20 },
    { x: 15, y: 25 },
    { x: 20, y: 22 },
    { x: 10, y: 20 },
    { x: 15, y: 85 },
    { x: 20, y: 13 },
    { x: 10, y: 20 },
    { x: 15, y: 35 },
    { x: 20, y: 18 },
    // ... more data points
  ]
  useEffect(() => {
    console.log(response?.content?.split('\n'))
  }, [response])
  const handleFileSelect = (e: any) => {
    const f = e.target.value
    console.log(f)
    setFile(f)
  }
  return (
    <main style={{ fontSize: 8 }}>
      <section>
        <div>
          <h1>Scatter Plot</h1>
          <ScatterPlotComponent data={data} xAccessor='x' yAccessor='y' />
        </div>
      </section>
      <section>
        <form
          className='inputs-3a86ea inputs-3a86ea-table'
          id='inputs-3a86ea-1'
          style={{
            maxHeight: 300,
            border: '1px solid #b7cbf4',
            borderRadius: 8,
          }}
        >
          <table style={{ width: '100%', border: '1px solid #b7cbf4' }}>
            <thead style={{ backgroundColor: '#444' }}>
              <tr>
                <th>
                  <input type='checkbox' />
                </th>
                <th title='Date'>
                  <span />
                  Date
                </th>
                <th title='Balancing authority'>
                  <span />
                  Balancing authority
                </th>
                <th title='Abbreviation'>
                  <span />
                  Abbreviation
                </th>
                <th title='Type'>
                  <span />
                  Type
                </th>
                <th title='Value (GWh)'>
                  <span />
                  Value (GWh)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={0} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Imperial Irrigation District</td>
                <td>IID</td>
                <td>Demand</td>
                <td>0.447</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={1} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tampa Electric Company</td>
                <td>TEC</td>
                <td>Demand</td>
                <td>2.634</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={2} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Western Area Power Administration - Rocky Mountain Region
                </td>
                <td>WACM</td>
                <td>Demand</td>
                <td>3.501</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={3} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Louisville Gas and Electric Company and Kentucky Utilities
                  Company
                </td>
                <td>LGEE</td>
                <td>Demand</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={4} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Florida Power &amp; Light Co.</td>
                <td>FPL</td>
                <td>Demand</td>
                <td>18.531</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={5} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>South Carolina Public Service Authority</td>
                <td>SC</td>
                <td>Demand</td>
                <td>2.465</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={6} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tennessee Valley Authority</td>
                <td>TVA</td>
                <td>Demand</td>
                <td>15.923</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={7} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Seminole Electric Cooperative</td>
                <td>SEC</td>
                <td>Demand</td>
                <td>0.276</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={8} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Portland General Electric Company</td>
                <td>PGE</td>
                <td>Demand</td>
                <td>2.278</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={9} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>PJM Interconnection, LLC</td>
                <td>PJM</td>
                <td>Demand</td>
                <td>82.603</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={10} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Public Utility District No. 1 of Chelan County</td>
                <td>CHPD</td>
                <td>Demand</td>
                <td>0.163</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={11} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Bonneville Power Administration</td>
                <td>BPAT</td>
                <td>Demand</td>
                <td>6.485</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={12} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tucson Electric Power</td>
                <td>TEPC</td>
                <td>Demand</td>
                <td>1.268</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={13} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southern Company Services, Inc. - Trans</td>
                <td>SOCO</td>
                <td>Demand</td>
                <td>22.917</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={14} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Associated Electric Cooperative, Inc.</td>
                <td>AECI</td>
                <td>Demand</td>
                <td>1.776</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={15} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>New York Independent System Operator</td>
                <td>NYIS</td>
                <td>Demand</td>
                <td>16.055</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={16} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>JEA</td>
                <td>JEA</td>
                <td>Demand</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={17} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>City of Homestead</td>
                <td>HST</td>
                <td>Demand</td>
                <td>0.095</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={18} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Midcontinent Independent System Operator, Inc.</td>
                <td>MISO</td>
                <td>Demand</td>
                <td>66.568</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={19} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Nevada Power Company</td>
                <td>NEVP</td>
                <td>Demand</td>
                <td>3.864</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={20} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Electric Reliability Council of Texas, Inc.</td>
                <td>ERCO</td>
                <td>Demand</td>
                <td>50.653</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={21} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>NorthWestern Corporation</td>
                <td>NWMT</td>
                <td>Demand</td>
                <td>1.253</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={22} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>ISO New England</td>
                <td>ISNE</td>
                <td>Demand</td>
                <td>12.784</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={23} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Los Angeles Department of Water and Power</td>
                <td>LDWP</td>
                <td>Demand</td>
                <td>0.102</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={24} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Salt River Project Agricultural Improvement and Power District
                </td>
                <td>SRP</td>
                <td>Demand</td>
                <td>3.891</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={25} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southwestern Power Administration</td>
                <td>SPA</td>
                <td>Demand</td>
                <td>-0.314</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={26} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Western Area Power Administration - Desert Southwest Region
                </td>
                <td>WALC</td>
                <td>Demand</td>
                <td>1.141</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={27} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Gainesville Regional Utilities</td>
                <td>GVL</td>
                <td>Demand</td>
                <td>0.243</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={28} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>City of Tallahassee</td>
                <td>TAL</td>
                <td>Demand</td>
                <td>0.316</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={29} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southwest Power Pool</td>
                <td>SWPP</td>
                <td>Demand</td>
                <td>29.644</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={30} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Balancing Authority of Northern California</td>
                <td>BANC</td>
                <td>Demand</td>
                <td>1.809</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={31} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Avista Corporation</td>
                <td>AVA</td>
                <td>Demand</td>
                <td>1.364</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={0} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Imperial Irrigation District</td>
                <td>IID</td>
                <td>Demand</td>
                <td>0.447</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={1} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tampa Electric Company</td>
                <td>TEC</td>
                <td>Demand</td>
                <td>2.634</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={2} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Western Area Power Administration - Rocky Mountain Region
                </td>
                <td>WACM</td>
                <td>Demand</td>
                <td>3.501</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={3} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Louisville Gas and Electric Company and Kentucky Utilities
                  Company
                </td>
                <td>LGEE</td>
                <td>Demand</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={4} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Florida Power &amp; Light Co.</td>
                <td>FPL</td>
                <td>Demand</td>
                <td>18.531</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={5} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>South Carolina Public Service Authority</td>
                <td>SC</td>
                <td>Demand</td>
                <td>2.465</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={6} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tennessee Valley Authority</td>
                <td>TVA</td>
                <td>Demand</td>
                <td>15.923</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={7} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Seminole Electric Cooperative</td>
                <td>SEC</td>
                <td>Demand</td>
                <td>0.276</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={8} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Portland General Electric Company</td>
                <td>PGE</td>
                <td>Demand</td>
                <td>2.278</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={9} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>PJM Interconnection, LLC</td>
                <td>PJM</td>
                <td>Demand</td>
                <td>82.603</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={10} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Public Utility District No. 1 of Chelan County</td>
                <td>CHPD</td>
                <td>Demand</td>
                <td>0.163</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={11} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Bonneville Power Administration</td>
                <td>BPAT</td>
                <td>Demand</td>
                <td>6.485</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={12} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Tucson Electric Power</td>
                <td>TEPC</td>
                <td>Demand</td>
                <td>1.268</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={13} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southern Company Services, Inc. - Trans</td>
                <td>SOCO</td>
                <td>Demand</td>
                <td>22.917</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={14} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Associated Electric Cooperative, Inc.</td>
                <td>AECI</td>
                <td>Demand</td>
                <td>1.776</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={15} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>New York Independent System Operator</td>
                <td>NYIS</td>
                <td>Demand</td>
                <td>16.055</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={16} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>JEA</td>
                <td>JEA</td>
                <td>Demand</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={17} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>City of Homestead</td>
                <td>HST</td>
                <td>Demand</td>
                <td>0.095</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={18} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Midcontinent Independent System Operator, Inc.</td>
                <td>MISO</td>
                <td>Demand</td>
                <td>66.568</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={19} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Nevada Power Company</td>
                <td>NEVP</td>
                <td>Demand</td>
                <td>3.864</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={20} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Electric Reliability Council of Texas, Inc.</td>
                <td>ERCO</td>
                <td>Demand</td>
                <td>50.653</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={21} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>NorthWestern Corporation</td>
                <td>NWMT</td>
                <td>Demand</td>
                <td>1.253</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={22} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>ISO New England</td>
                <td>ISNE</td>
                <td>Demand</td>
                <td>12.784</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={23} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Los Angeles Department of Water and Power</td>
                <td>LDWP</td>
                <td>Demand</td>
                <td>0.102</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={24} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Salt River Project Agricultural Improvement and Power District
                </td>
                <td>SRP</td>
                <td>Demand</td>
                <td>3.891</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={25} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southwestern Power Administration</td>
                <td>SPA</td>
                <td>Demand</td>
                <td>-0.314</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={26} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>
                  Western Area Power Administration - Desert Southwest Region
                </td>
                <td>WALC</td>
                <td>Demand</td>
                <td>1.141</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={27} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Gainesville Regional Utilities</td>
                <td>GVL</td>
                <td>Demand</td>
                <td>0.243</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={28} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>City of Tallahassee</td>
                <td>TAL</td>
                <td>Demand</td>
                <td>0.316</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={29} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Southwest Power Pool</td>
                <td>SWPP</td>
                <td>Demand</td>
                <td>29.644</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={30} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Balancing Authority of Northern California</td>
                <td>BANC</td>
                <td>Demand</td>
                <td>1.809</td>
              </tr>
              <tr>
                <td>
                  <input type='checkbox' defaultValue={31} />
                </td>
                <td>Apr 12, 03 PM</td>
                <td>Avista Corporation</td>
                <td>AVA</td>
                <td>Demand</td>
                <td>1.364</td>
              </tr>
            </tbody>
          </table>
          <style
            dangerouslySetInnerHTML={{
              __html: '#inputs-3a86ea-1 tr>:nth-child(6){text-align:right}',
            }}
          />
        </form>
      </section>
      <section className='cf mt5 bt b--black-05'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 className='f5 ttu fw6'>Overview</h1>
          <select onChange={handleFileSelect}>
            {Object.keys(index)?.map?.((k: string, ki: number) => {
              return (
                <option value={k} key={ki}>
                  {k}
                </option>
              )
            })}
          </select>
        </div>

        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
        >
          <pre>{response.content}</pre>
        </div>

        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <NumAPCitations />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <NumCitations />
        </div>
        <div
          className='last8 fl w-50 border-box overflow-hidden ba'
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
        >
          <NumDocAuths />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <AffiliationsContinent />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
            width: '100%',
          }}
          className='last9 fl w-100 h-50 border-box ba '
          title=''
        >
          <NumDocAuths />
        </div>
      </section>
    </main>
  )
}

export default Overview
